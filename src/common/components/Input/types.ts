import { InputHTMLAttributes, ReactNode } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  hasClear?: boolean;
  onClear?: () => void;
}
