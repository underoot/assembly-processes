import {
  IProcess,
  IProcessUpdate,
  ReviewStatus,
  AssemblyStatus
} from 'processes/types/Process';

export interface ICardProps {
  process: IProcess;
  onDelete: (id: IProcess['id']) => void;
  onChangeTitle: (update: IProcessUpdate) => void;
}

export interface ICardReviewStatusProps {
  status: ReviewStatus;
}

export interface ICardAssemblyStatusProps {
  status: AssemblyStatus;
}
