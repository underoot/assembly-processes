import { HTMLAttributes } from 'react';

export interface IIconProps extends HTMLAttributes<HTMLElement> {
  type: 'arrow' | 'close' | 'edit' | 'search' | 'trash';
}
