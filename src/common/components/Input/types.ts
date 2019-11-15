import { InputHTMLAttributes, ReactNode, LegacyRef } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  hasClear?: boolean;
  onClear?: () => void;
  ref?: LegacyRef<HTMLInputElement>;
}
