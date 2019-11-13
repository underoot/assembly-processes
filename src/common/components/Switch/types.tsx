import { ReactNode, ReactElement } from 'react';

export interface ISwitchItemProps {
  value: any;
  htmlFor?: string;
  children?: ReactNode;
}

export interface ISwitchProps<T> {
  children: ReactElement<ISwitchItemProps>[];
  value: T;
  onChange: (value: T) => void;
}
