import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { apiRequest, IAPIRequest } from 'common/operators/api';

import { IProcess } from 'processes/types/Process';

export const useDeleteProcess = (
  onDeleteProcess: () => void
): [(id: IProcess['id']) => void] => {
  const [deleteProcess$] = useState(new Subject<IProcess['id']>());
  const [deleteProcessRequest$] = useState(
    deleteProcess$.pipe(
      map(
        (id): IAPIRequest => ({
          method: 'DELETE',
          pathname: `/api/processes/${id}`
        })
      ),
      apiRequest()
    )
  );

  useEffect(() => {
    const subscription = deleteProcessRequest$.subscribe(() => {
      onDeleteProcess();
    });

    return () => subscription.unsubscribe();
  });

  return [
    (v: IProcess['id']) => {
      deleteProcess$.next(v);
    }
  ];
};
