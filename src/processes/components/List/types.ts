import { ReactNode } from 'react';

import { IProcess, IProcessUpdate } from 'processes/types/Process';

export interface IListProps {
  header?: ReactNode;
  processes: IProcess[];
  onDelete: (id: IProcess['id']) => void;
  onChangeTitle: (update: IProcessUpdate) => void;
  onIncrementPage: () => void;
}
