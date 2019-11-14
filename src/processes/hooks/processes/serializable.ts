import { useEffect, useCallback, useState } from 'react';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { parse } from 'query-string';

import { SortOrder } from 'common/types';
import { setURLSearch } from 'common/utils/url';

import { AssemblyStatus, ReviewStatus } from 'processes/types/Process';
import { SerializableDictionary } from 'processes/hooks/processes/types';

/**
 * Обновление и синхронизация параметров с URL-ом страницы
 */
export const useSerializableProceses = (
  assemblyStatus$: BehaviorSubject<AssemblyStatus>,
  reviewStatus$: BehaviorSubject<ReviewStatus>,
  searchTerm$: BehaviorSubject<string>,
  delayedSearchTerm$: Observable<string>,
  sortOrder$: BehaviorSubject<SortOrder>
) => {
  const [processesParams$] = useState(
    combineLatest(
      assemblyStatus$,
      reviewStatus$,
      delayedSearchTerm$,
      sortOrder$
    )
  );

  const updateStateFromURL = useCallback(() => {
    const serializableParams: SerializableDictionary = {
      assemblyStatus: assemblyStatus$,
      reviewStatus: reviewStatus$,
      searchTerm: searchTerm$,
      sortOrder: sortOrder$
    };

    const props = parse(window.location.search);

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
};
