import React from 'react';
import styled from '@emotion/styled';

import { IInputProps } from 'common/components/Input/types';
import { Icon } from 'common/components/Icon';

const StyledInput = styled.div`
  position: relative;
`;

const StyledIcon = styled.span`
  position: absolute;
  margin-top: 6px;
  left: var(--space-size-extra-small);
`;

const StyledInputControl = styled.input<IInputProps>`
  width: 100%;
  box-sizing: border-box;
  font: var(--paragraph-size-medium);
  height: 32px;
  padding: ${props =>
    props.icon
      ? '0 var(--space-size-small) 0 40px'
      : '0 var(--space-size-small)'};
  border-radius: 29px;
  border: 1px solid var(--color-border);
  outline: none;

  &:focus {
    border: 1px solid var(--color-view);
  }
`;

const StyledClear = styled.span`
  position: absolute;
  cursor: pointer;
  margin-top: 4px;
  right: var(--space-size-extra-small);
`;

export const Input = ({
  hasClear = true,
  onClear,
  icon,
  ...props
}: IInputProps) => {
  const onClickClear = () => {
    if (!onClear) {
      return;
    }

    onClear();
  };

  const clearIcon = (
    <StyledClear>
      <Icon type="close" onClick={onClickClear} tabIndex={0} />
    </StyledClear>
  );

  const showClear = hasClear && Boolean(props.value);

  return (
    <StyledInput>
      {icon && <StyledIcon>{icon}</StyledIcon>}
      <StyledInputControl icon={icon} {...props} />
      {showClear && clearIcon}
    </StyledInput>
  );
};
