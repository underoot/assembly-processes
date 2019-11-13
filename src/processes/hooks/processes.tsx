import { useState, useEffect } from 'react';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, scan } from 'rxjs/operators';

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
  const [page$] = useState(new Subject<number>());
  const [deleteProcess$] = useState(new Subject<IProcess['id']>());
  const [changeTitle$] = useState(
    new Subject<[IProcess['id'], IProcess['title']]>()
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
    page$.next(page);
  }, [page$, page]);

  useEffect(() => {
    const delayedSearchTerm$ = searchTerm$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );

    const processes$ = combineLatest(
      assemblyStatus$,
      reviewStatus$,
      delayedSearchTerm$,
      sortOrder$,
      page$
    ).pipe(
      map(
        ([assemblyStatus, reviewStatus, q, _order, _page]): IAPIRequest => ({
          method: 'GET',
          pathname: '/api/processes',
          query: {
            assemblyStatus,
            reviewStatus,
            q,
            _order,
            _page: _page.toString()
          },
          merge: {
            page: _page
          }
        })
      ),
      apiRequest<ICountable<IProcess>>()
    );

    const subItems = processes$
      .pipe(
        scan((acc, { items, page }) => {
          if (page === 0) {
            return items;
          }

          return [...acc, ...items];
        }, [] as IProcess[])
      )
      .subscribe(changeProcesses);

    const subCount = processes$.pipe(map(v => v.count)).subscribe(changeCount);

    return () => {
      subItems.unsubscribe();
      subCount.unsubscribe();
    };
  }, [
    assemblyStatus$,
    reviewStatus$,
    searchTerm$,
    sortOrder$,
    page$,
    changeProcesses,
    changeCount
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
        changePage(0);
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
    changePage,
    incrementPage: () => changePage(page => page + 1),
    clearSearchTerm: () => searchTerm$.next(''),
    deleteProcess: deleteProcess$.next.bind(deleteProcess$),
    changeTitle: (id: IProcess['id'], title: IProcess['title']) =>
      changeTitle$.next([id, title])
  };
};
