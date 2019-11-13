import {
  IProcess,
  ReviewStatus,
  AssemblyStatus
} from 'processes/types/Process';

export interface ICardProps {
  process: IProcess;
  onDelete: (id: IProcess['id']) => void;
  onChangeTitle: (id: IProcess['id'], title: IProcess['title']) => void;
}

export interface ICardReviewStatusProps {
  status: ReviewStatus;
}

export interface ICardAssemblyStatusProps {
  status: AssemblyStatus;
}
