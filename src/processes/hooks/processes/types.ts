import { SortOrder } from 'common/types';

import {
  AssemblyStatus,
  ReviewStatus,
  IProcess
} from 'processes/types/Process';

export interface ISearchParams {
  assemblyStatus: AssemblyStatus;
  reviewStatus: ReviewStatus;
  searchTerm: string;
  sortOrder: SortOrder;
}

export interface ISerializableParams extends ISearchParams {
  changeAssemblyStatus: (status: AssemblyStatus) => void;
  changeReviewStatus: (status: ReviewStatus) => void;
  changeSearchTerm: (term: string) => void;
  changeSortOrder: (order: SortOrder) => void;
}

export interface IGetProcessesParams extends ISearchParams {
  page: number;
  processes: IProcess[];
  changeProcesses: (processes: IProcess[]) => void;
  changeCount: (count: number) => void;
  changePage: (page: number) => void;
  changeLoading: (state: boolean) => void;
}
