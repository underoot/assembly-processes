import React from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

import icon from 'common/components/Loader/assets/loader.svg';
import { ILoaderProps } from 'common/components/Loader/types';

const sizes = {
  s: '16px',
  m: '32px',
  l: '64px'
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.span<ILoaderProps>`
  display: inline-block;
  vertical-align: middle;
  background-image: url(${icon});
  background-repeat: no-repeat;
  width: ${({ size }) => size && sizes[size]};
  height: ${({ size }) => size && sizes[size]};
  animation: "${rotate}" 1.5s ease infinite;
`;

export const Loader = ({ size = 'm' }: ILoaderProps) => (
  <StyledLoader size={size} />
);
