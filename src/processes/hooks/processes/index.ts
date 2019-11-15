import { useState, useCallback, useEffect } from 'react';

import { SortOrder } from 'common/types';
import { getURLSearch } from 'common/utils/url';

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

  const [isLoading, changeLoading] = useState(false);

  const [processes, changeProcesses] = useState([] as IProcess[]);
  const [count, changeCount] = useState(0);

  const [page, changePage] = useState(0);
  const incrementPage = useCallback(() => changePage(page => page + 1), []);

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

  const reloadSubscription = useCallback(() => changePage(-1), []);

  const [deleteProcess] = useDeleteProcess(reloadSubscription);
  const [changeTitle] = useUpdateProcess();

  useEffect(() => {
    if (page === -1) {
      changePage(0);
    }
  }, [page, changePage]);

  useSerializableProceses({
    assemblyStatus,
    reviewStatus,
    searchTerm,
    sortOrder,
    changeAssemblyStatus,
    changeReviewStatus,
    changeSearchTerm,
    changeSortOrder
  });

  useGetProcesses({
    assemblyStatus,
    reviewStatus,
    searchTerm,
    sortOrder,
    page,
    processes,
    changeProcesses,
    changeCount,
    changePage,
    changeLoading
  });

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
    clearSearchTerm: () => changeSearchTerm(''),
    deleteProcess,
    changeTitle,

    isLoading
  };
};
