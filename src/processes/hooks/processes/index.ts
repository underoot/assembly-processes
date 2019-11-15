import { useState, useCallback, useEffect } from 'react';
import { combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SortOrder } from 'common/types';
import { getURLSearch } from 'common/utils/url';
import { useSubject } from 'common/hooks/subject';

import { useSerializableProceses } from 'processes/hooks/processes/serializable';
import { useGetProcesses } from 'processes/hooks/processes/get';
import { useDeleteProcess } from 'processes/hooks/processes/delete';
import { useUpdateProcess } from 'processes/hooks/processes/update';
import { ISearchParams } from 'processes/hooks/processes/types';

import {
  AssemblyStatus,
  ReviewStatus,
  IProcess
} from 'processes/types/Process';

export const useProcesses = () => {
  const {
    assemblyStatus: assemblyStatusSearch,
    reviewStatus: reviewStatusSearch,
    searchTerm: searchTermSearch,
    sortOrder: sortOrderSearch
  } = getURLSearch<ISearchParams>();

  const [processes, changeProcesses] = useState([] as IProcess[]);
  const [count, changeCount] = useState(0);

  const [page, changePage] = useState(0);
  const resetToInitialPage = useCallback(() => changePage(0), []);
  const incrementPage = useCallback(() => changePage(page => page + 1), []);

  const [assemblyStatus, assemblyStatus$, changeAssemblyStatus] = useSubject(
    assemblyStatusSearch || AssemblyStatus.ANY,
    resetToInitialPage
  );

  const [reviewStatus, reviewStatus$, changeReviewStatus] = useSubject(
    reviewStatusSearch || ReviewStatus.ANY,
    resetToInitialPage
  );

  const [searchTerm, searchTerm$, changeSearchTerm] = useSubject(
    searchTermSearch || '',
    resetToInitialPage
  );

  const [sortOrder, sortOrder$, changeSortOrder] = useSubject(
    sortOrderSearch || SortOrder.ASC,
    resetToInitialPage
  );

  const reloadSubscription = useCallback(() => changePage(-1), []);

  const [deleteProcess] = useDeleteProcess(reloadSubscription);
  const [changeTitle] = useUpdateProcess();

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
    if (page === -1) {
      changePage(0);
    }
  }, [page, changePage]);

  useSerializableProceses(
    assemblyStatus$,
    reviewStatus$,
    searchTerm$,
    delayedSearchTerm$,
    sortOrder$
  );

  useGetProcesses(
    processesParams$,
    page,
    processes,
    changeProcesses,
    changeCount
  );

  return {
    assemblyStatus,
    reviewStatus,
    searchTerm,
    sortOrder,
    count,
    processes,

    changeAssemblyStatus,
    changeReviewStatus,
    changeSearchTerm,
    changeSortOrder,
    incrementPage,
    clearSearchTerm: () => searchTerm$.next(''),
    deleteProcess,
    changeTitle
  };
};
