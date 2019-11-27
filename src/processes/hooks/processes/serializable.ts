import { useEffect, useCallback } from 'react';
import { parse } from 'query-string';

import { setURLSearch } from 'common/utils/url';

import { ISerializableParams } from 'processes/hooks/processes/types';

/**
 * Обновление и синхронизация параметров с URL-ом страницы
 */
export const useSerializableProceses = ({
  assemblyStatus,
  reviewStatus,
  searchTerm,
  sortOrder,
  changeAssemblyStatus,
  changeReviewStatus,
  changeSearchTerm,
  changeSortOrder
}: ISerializableParams) => {
  const updateStateFromURL = useCallback(() => {
    const serializableParams: { [key: string]: (param: any) => void } = {
      assemblyStatus: changeAssemblyStatus,
      reviewStatus: changeReviewStatus,
      searchTerm: changeSearchTerm,
      sortOrder: changeSortOrder
    };

    const props = parse(window.location.search);

    return Object.keys(serializableParams).forEach(key => {
      if (props[key]) {
        serializableParams[key](props[key]);
      }
    });
  }, [
    changeAssemblyStatus,
    changeReviewStatus,
    changeSearchTerm,
    changeSortOrder
  ]);

  useEffect(() => {
    window.addEventListener('popstate', updateStateFromURL);

    return () => window.removeEventListener('popstate', updateStateFromURL);
  });

  useEffect(() => {
    setURLSearch({
      assemblyStatus,
      reviewStatus,
      searchTerm,
      sortOrder
    });
  }, [assemblyStatus, reviewStatus, searchTerm, sortOrder]);
};
