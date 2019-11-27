import React from 'react';
import styled from '@emotion/styled';

import logo from 'common/assets/logo.svg';
import { IHeaderProps } from 'common/components/Header/types';

const StyledHeader = styled.header`
  padding: var(--space-size-small) var(--space-size-medium);
  background-color: var(--color-background);
  box-shadow: inset 0px -1px 0px #d6dadb;
`;

const StyledLogo = styled.div`
  display: inline-block;
  width: 67px;
  height: 24px;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position-y: bottom;
`;

export const StyledTitle = styled.h1`
  display: none;
  margin-left: 10px;
  font: var(--heading-size-large);
  color: var(--color-heading);

  @media (min-width: 768px) {
    display: inline-block;
  }
`;

export const Header = ({ title }: IHeaderProps) => (
  <StyledHeader>
    <StyledLogo />
    {title && <StyledTitle>{title}</StyledTitle>}
  </StyledHeader>
);
