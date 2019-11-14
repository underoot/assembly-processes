import { useState, useEffect } from 'react';
import { BehaviorSubject, combineLatest, Subject, of } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

import { SortOrder, ICountable } from 'common/types';
import { apiRequest, IAPIRequest } from 'common/operators/api';

import {
  AssemblyStatus,
  ReviewStatus,
  IProcess
} from 'processes/types/Process';

export const useProcesses = () => {
  const [processes, changeProcesses] = useState([] as IProcess[]);
  const [count, changeCount] = useState(0);
  const [assemblyStatus, changeAssemblyStatus] = useState(AssemblyStatus.ANY);
  const [reviewStatus, changeReviewStatus] = useState(ReviewStatus.ANY);
  const [searchTerm, changeSearchTerm] = useState('');
  const [sortOrder, changeSortOrder] = useState(SortOrder.ASC);
  const [page, changePage] = useState(-1);

  const [assemblyStatus$] = useState(new BehaviorSubject(AssemblyStatus.ANY));
  const [reviewStatus$] = useState(new BehaviorSubject(ReviewStatus.ANY));
  const [searchTerm$] = useState(new BehaviorSubject(''));
  const [sortOrder$] = useState(new BehaviorSubject(SortOrder.ASC));
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
    return assemblyStatus$.subscribe(assemblyStatus => {
      changeAssemblyStatus(assemblyStatus);
      changePage(0);
    }).unsubscribe;
  }, [assemblyStatus$, changeAssemblyStatus]);

  useEffect(() => {
    return reviewStatus$.subscribe(reviewStatus => {
      changeReviewStatus(reviewStatus);
      changePage(0);
    }).unsubscribe;
  }, [reviewStatus$, changeReviewStatus]);

  useEffect(() => {
    return searchTerm$.subscribe(searchTerm => {
      changeSearchTerm(searchTerm);
      changePage(0);
    }).unsubscribe;
  }, [searchTerm$, changeSearchTerm]);

  useEffect(() => {
    return sortOrder$.subscribe(sortOrder => {
      changeSortOrder(sortOrder);
      changePage(0);
    }).unsubscribe;
  }, [sortOrder$, changeSortOrder]);

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
  }, [page, processes.length ? processes[processes.length - 1].id : undefined]);

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
    incrementPage: () => changePage(page => page + 1),
    clearSearchTerm: () => searchTerm$.next(''),
    deleteProcess: deleteProcess$.next.bind(deleteProcess$),
    changeTitle: (id: IProcess['id'], title: IProcess['title']) =>
      changeTitle$.next([id, title])
  };
};
