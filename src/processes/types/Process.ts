import { ISO8601DateTime, IEntity } from 'common/types';

export enum AssemblyStatus {
  ANY = '',
  IN = 'IN_REVIEW',
  FINISHED = 'REVIEW_FINISHED'
}

export enum ReviewStatus {
  ANY = '',
  DRAFT = 'DRAFT',
  SOLVED = 'SOLVED',
  SIMULATION_REQUESTED = 'SIMULATION_REQUESTED',
  SIMULATION_NEGATIVE = 'SIMULATION_NEGATIVE',
  SIMULATION_POSITIVE = 'SIMULATION_POSITIVE'
}

export interface IProcess extends IEntity {
  img: string;
  age: number;
  assemblyStatus: AssemblyStatus;
  reviewStatus: ReviewStatus;
  title: string;
  updated: ISO8601DateTime;
}
