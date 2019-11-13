import { ReactNode } from 'react';

import { IProcess } from 'processes/types/Process';

export interface IListProps {
  header?: ReactNode;
  processes: IProcess[];
  onDelete: (id: IProcess['id']) => void;
  onChangeTitle: (id: IProcess['id'], title: string) => void;
  onScrollToEnd: () => void;
}
