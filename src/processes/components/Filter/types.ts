import { AssemblyStatus, ReviewStatus } from 'processes/types/Process';

export interface IFilterItemProps {
  active: boolean;
}

export interface IFilterProps {
  assemblyStatus: AssemblyStatus;
  reviewStatus: ReviewStatus;
  onChangeAssemblyStatus: (status: AssemblyStatus) => void;
  onChangeReviewStatus: (status: ReviewStatus) => void;
}

export interface IFilterPaneProps {
  hide: boolean;
}
