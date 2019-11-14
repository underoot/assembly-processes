import React, { KeyboardEvent } from 'react';
import styled from '@emotion/styled';

import * as icons from 'common/components/Icon/assets';
import { IIconProps } from 'common/components/Icon/types';

export const StyledIcon = styled.i<IIconProps>`
  display: inline-block;
  background-image: url(${props => icons[props.type]});
  width: 24px;
  height: 24px;
`;

export const Icon = ({ type, ...props }: IIconProps) => {
  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.click();
    }
  };
  return <StyledIcon type={type} onKeyDown={onKeyDown} {...props} />;
};
