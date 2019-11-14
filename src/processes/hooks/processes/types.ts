import { BehaviorSubject, Observable } from 'rxjs';

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

export type SerializableDictionary = {
  [key: string]: BehaviorSubject<any>;
};
