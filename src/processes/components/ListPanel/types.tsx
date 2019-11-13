import { SortOrder } from 'common/types';

export interface IListPanelProps {
  count: number;
  order: SortOrder;
  onChangeOrder: (order: SortOrder) => void;
  search: string;
  onChangeSearch: (search: string) => void;
  onClearSearch: () => void;
}
