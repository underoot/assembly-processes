import { useEffect } from 'react';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICountable, SortOrder } from 'common/types';

import {
  AssemblyStatus,
  ReviewStatus,
  IProcess
} from 'processes/types/Process';
import { apiRequest, IAPIRequest } from 'common/operators/api';

export const useGetProcesses = (
  processesParams$: Observable<
    [AssemblyStatus, ReviewStatus, string, SortOrder]
  >,
  page: number,
  processes: IProcess[],
  changeProcesses: (processes: IProcess[]) => void,
  changeCount: (count: number) => void
) => {
  const processesSerialized = processes.length
    ? processes[processes.length - 1].id
    : undefined;

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

    const subscription = processes$
      .pipe(
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
    changeCount,
    changeProcesses,
    processesParams$,
    page,
    processesSerialized
  ]);
};
