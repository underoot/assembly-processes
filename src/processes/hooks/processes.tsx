import { useState, useEffect, useCallback } from 'react';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import qs from 'query-string';

import { SortOrder, ICountable } from 'common/types';
import { apiRequest, IAPIRequest } from 'common/operators/api';
import { setURLSearch } from 'common/utils/url';
import { useSubject } from 'common/hooks/subject';

import {
  AssemblyStatus,
  ReviewStatus,
  IProcess
} from 'processes/types/Process';

interface IParams {
  assemblyStatus: AssemblyStatus;
  reviewStatus: ReviewStatus;
  searchTerm: string;
  sortOrder: SortOrder;
}

const getURLSearchParams = (): IParams => qs.parse(window.location.search);

export const useProcesses = () => {
  const {
    assemblyStatus: assemblyStatusSearch,
    reviewStatus: reviewStatusSearch,
    searchTerm: searchTermSearch,
    sortOrder: sortOrderSearch
  } = getURLSearchParams();

  const [processes, changeProcesses] = useState([] as IProcess[]);
  const [count, changeCount] = useState(0);
  const [page, changePage] = useState(-1);

  const resetPage = () => changePage(0);
  const incrementPage = useCallback(() => changePage(page => page + 1), []);

  const [assemblyStatus, assemblyStatus$, changeAssemblyStatus] = useSubject(
    assemblyStatusSearch || AssemblyStatus.ANY,
    resetPage
  );

  const [reviewStatus, reviewStatus$, changeReviewStatus] = useSubject(
    reviewStatusSearch || ReviewStatus.ANY,
    resetPage
  );

  const [searchTerm, searchTerm$, changeSearchTerm] = useSubject(
    searchTermSearch || '',
    resetPage
  );

  const [sortOrder, sortOrder$, changeSortOrder] = useSubject(
    sortOrderSearch || SortOrder.ASC,
    resetPage
  );

  const [deleteProcess$] = useState(new Subject<IProcess['id']>());
  const [changeTitle$] = useState(
    new Subject<[IProcess['id'], IProcess['title']]>()
  );

  const [delayedSearchTerm$] = useState(
    searchTerm$.pipe(debounceTime(200), distinctUntilChanged())
  );

  const [processesParams$] = useState(
    combineLatest(
      assemblyStatus$,
      reviewStatus$,
      delayedSearchTerm$,
      sortOrder$
    )
  );

  useEffect(() => {
    const subscription = processesParams$.subscribe(
      ([assemblyStatus, reviewStatus, searchTerm, sortOrder]) => {
        setURLSearch({
          assemblyStatus,
          reviewStatus,
          searchTerm,
          sortOrder
        });
      }
    );

    return () => subscription.unsubscribe();
  }, [processesParams$]);

  const updateStateFromURL = useCallback(() => {
    const serializableParams: { [key: string]: BehaviorSubject<any> } = {
      assemblyStatus: assemblyStatus$,
      reviewStatus: reviewStatus$,
      searchTerm: searchTerm$,
      sortOrder: sortOrder$
    };

    const props = qs.parse(window.location.search);

    return Object.keys(serializableParams).forEach(key => {
      if (props[key]) {
        serializableParams[key].next(props[key]);
      }
    });
  }, [assemblyStatus$, reviewStatus$, searchTerm$, sortOrder$]);

  useEffect(() => {
    window.addEventListener('popstate', updateStateFromURL);

    return () => window.removeEventListener('popstate', updateStateFromURL);
  });

  useEffect(() => {
    const processes$ = processesParams$.pipe(
      map(
        ([assemblyStatus, reviewStatus, q, _order]): IAPIRequest => ({
          method: 'GET',
          pathname: '/api/processes',
          query: {
            assemblyStatus,
            reviewStatus,
            q,
            _order,
            _page: page.toString()
          }
        })
      ),
      apiRequest<ICountable<IProcess>>()
    );

    const itemsSubscription = processes$
      .pipe(
        map(p => p.items),
        map(newProcesses => {
          if (page === -1) {
            return [];
          }

          if (page === 0) {
            return newProcesses;
          }

          if (
            processes.length &&
            newProcesses.length &&
            newProcesses[newProcesses.length - 1].id ===
              processes[processes.length - 1].id
          ) {
            return processes;
          }

          return [...processes, ...newProcesses];
        })
      )
      .subscribe(changeProcesses);

    const countSubscription = processes$
      .pipe(map(r => r.count))
      .subscribe(changeCount);

    return () => {
      itemsSubscription.unsubscribe();
      countSubscription.unsubscribe();
    };
    // eslint-disable-next-line
  }, [
    processesParams$,
    page,
    // eslint-disable-next-line
    processes.length ? processes[processes.length - 1].id : undefined
  ]);

  useEffect(() => {
    const sub = deleteProcess$
      .pipe(
        map(
          (id): IAPIRequest => ({
            method: 'DELETE',
            pathname: `/api/processes/${id}`
          })
        ),
        apiRequest()
      )
      .subscribe(() => {
        changePage(-1);
      });

    return () => sub.unsubscribe();
  }, [deleteProcess$]);

  useEffect(() => {
    const sub = changeTitle$
      .pipe(
        map(
          ([id, title]): IAPIRequest => ({
            method: 'PATCH',
            pathname: `/api/processes/${id}`,
            body: {
              title
            }
          })
        ),
        apiRequest()
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, [changeTitle$]);

  return {
    assemblyStatus,
    reviewStatus,
    searchTerm,
    sortOrder,
    count,
    processes,
    page,

    changeAssemblyStatus,
    changeReviewStatus,
    changeSearchTerm,
    changeSortOrder,
    incrementPage,
    clearSearchTerm: () => searchTerm$.next(''),
    deleteProcess: deleteProcess$.next.bind(deleteProcess$),
    changeTitle: (id: IProcess['id'], title: IProcess['title']) =>
      changeTitle$.next([id, title])
  };
};
