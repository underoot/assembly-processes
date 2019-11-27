import { AssemblyStatus, ReviewStatus } from 'processes/types/Process';

export const AssemblyStatusHumanRedableText: { [key: string]: string } = {
  [AssemblyStatus.ANY]: 'Any',
  [AssemblyStatus.IN]: 'In Review',
  [AssemblyStatus.FINISHED]: 'Review Finished'
};

export const ReviewStatusHumanReadableText: { [key: string]: string } = {
  [ReviewStatus.ANY]: 'Any',
  [ReviewStatus.DRAFT]: 'Draft',
  [ReviewStatus.SOLVED]: 'Solved',
  [ReviewStatus.SIMULATION_REQUESTED]: 'Simulation Requested',
  [ReviewStatus.SIMULATION_NEGATIVE]: 'Simulation Negative',
  [ReviewStatus.SIMULATION_POSITIVE]: 'Simulation Positive'
};
