import { useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ICountable } from 'common/types';
import { apiRequest, IAPIRequest } from 'common/operators/api';

import { IProcess } from 'processes/types/Process';
import { IGetProcessesParams } from 'processes/hooks/processes/types';

export const useGetProcesses = ({
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
}: IGetProcessesParams) => {
  const processesSerialized = processes.length
    ? processes[processes.length - 1].id
    : undefined;

  useEffect(() => {
    changePage(0);
  }, [assemblyStatus, reviewStatus, searchTerm, sortOrder, changePage]);

  useEffect(() => {
    const subscription = new BehaviorSubject<IAPIRequest>({
      method: 'GET',
      pathname: '/api/processes',
      query: {
        assemblyStatus,
        reviewStatus,
        q: searchTerm,
        _order: sortOrder,
        _page: page.toString()
      }
    })
      .pipe(
        tap(() => changeLoading(true)),
        apiRequest<ICountable<IProcess>>(),
        tap(() => changeLoading(false)),
        map(p => {
          changeCount(p.count);
          return p.items;
        }),
        map(newProcesses => {
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

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line
  }, [
    assemblyStatus,
    reviewStatus,
    searchTerm,
    sortOrder,
    changeCount,
    changeProcesses,
    page,
    processesSerialized
  ]);
};
