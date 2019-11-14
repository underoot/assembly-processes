import { useState, useEffect, useCallback } from 'react';
import { BehaviorSubject, combineLatest, Subject, queueScheduler } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import qs from 'query-string';

import { SortOrder, ICountable } from 'common/types';
import { apiRequest, IAPIRequest } from 'common/operators/api';
import { setURLSearch } from 'common/utils/url';

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
  const [assemblyStatus, changeAssemblyStatus] = useState(
    assemblyStatusSearch || AssemblyStatus.ANY
  );
  const [reviewStatus, changeReviewStatus] = useState(
    reviewStatusSearch || ReviewStatus.ANY
  );
  const [searchTerm, changeSearchTerm] = useState(searchTermSearch || '');
  const [sortOrder, changeSortOrder] = useState(
    sortOrderSearch || SortOrder.ASC
  );
  const [page, changePage] = useState(-1);

  const [assemblyStatus$] = useState(
    new BehaviorSubject(assemblyStatusSearch || AssemblyStatus.ANY)
  );
  const [reviewStatus$] = useState(
    new BehaviorSubject(reviewStatusSearch || ReviewStatus.ANY)
  );
  const [searchTerm$] = useState(new BehaviorSubject(searchTermSearch || ''));
  const [sortOrder$] = useState(
    new BehaviorSubject(sortOrderSearch || SortOrder.ASC)
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

    Object.keys(serializableParams).map(key => {
      if (props[key]) {
        serializableParams[key].next(props[key]);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', updateStateFromURL);

    return () => window.removeEventListener('popstate', updateStateFromURL);
  });

  useEffect(() => {
    const s = assemblyStatus$.subscribe(assemblyStatus => {
      changeAssemblyStatus(assemblyStatus);
      changePage(0);
    });

    return () => s.unsubscribe();
  }, [assemblyStatus$, changeAssemblyStatus]);

  useEffect(() => {
    const s = reviewStatus$.subscribe(reviewStatus => {
      changeReviewStatus(reviewStatus);
      changePage(0);
    });

    return () => s.unsubscribe();
  }, [reviewStatus$, changeReviewStatus, page]);

  useEffect(() => {
    const s = searchTerm$.subscribe(searchTerm => {
      changeSearchTerm(searchTerm);
      changePage(0);
    });

    return () => s.unsubscribe();
  }, [searchTerm$, changeSearchTerm, page]);

  useEffect(() => {
    const s = sortOrder$.subscribe(sortOrder => {
      changeSortOrder(sortOrder);
      changePage(0);
    });

    return () => s.unsubscribe();
  }, [sortOrder$, changeSortOrder, page]);

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

    changeAssemblyStatus: assemblyStatus$.next.bind(assemblyStatus$),
    changeReviewStatus: reviewStatus$.next.bind(reviewStatus$),
    changeSearchTerm: searchTerm$.next.bind(searchTerm$),
    changeSortOrder: sortOrder$.next.bind(sortOrder$),
    incrementPage: useCallback(() => changePage(page => page + 1), []),
    clearSearchTerm: () => searchTerm$.next(''),
    deleteProcess: deleteProcess$.next.bind(deleteProcess$),
    changeTitle: (id: IProcess['id'], title: IProcess['title']) =>
      changeTitle$.next([id, title])
  };
};
