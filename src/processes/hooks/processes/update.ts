import { useState, useEffect } from 'react';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { apiRequest, IAPIRequest } from 'common/operators/api';

import { IProcessUpdate } from 'processes/types/Process';

export const useUpdateProcess = (): [(update: IProcessUpdate) => void] => {
  const [changeTitle$] = useState(new Subject<IProcessUpdate>());

  useEffect(() => {
    const subscription = changeTitle$
      .pipe(
        map(
          ({ id, title }): IAPIRequest => ({
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

    return () => subscription.unsubscribe();
  }, [changeTitle$]);

  return [update => changeTitle$.next(update)];
};
