export type ISO8601DateTime = string;

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export interface IEntity {
  id: string;
}

export type ICountable<T extends IEntity> = {
  page: number;
  count: number;
  items: T[];
};
