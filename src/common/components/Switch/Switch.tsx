import React, { Fragment, cloneElement } from 'react';
import styled from '@emotion/styled';

import { ISwitchProps, ISwitchItemProps } from 'common/components/Switch/types';

const StyledSwitch = styled.div`
  display: flex;
  margin-left: 12px;
  margin-right: 12px;
`;

const StyledControl = styled.input`
  width: 0px;
  height: 0px;
  position: absolute;
  left: -999px;
`;

const StyledBox = styled.label<ISwitchItemProps>`
  cursor: pointer;
  display: inline-block;
  background-color: var(--color-background-control);
  border-radius: 21px;
  font: var(--paragraph-size-medium);
  color: var(--color-primary);
  padding: 4px var(--space-size-large);
  margin-left: -12px;
  margin-right: -12px;
  border: 1px solid rgba(255, 255, 255, 0);

  input:focus + & {
    border: 1px solid var(--color-view);
  }

  input:checked + & {
    z-index: 1;
    background-color: var(--color-default);
    color: var(--color-active);
    box-shadow: 0px 2px 4px rgba(55, 88, 123, 0.16),
      0px 2px 4px rgba(0, 0, 0, 0.06);
  }
`;

export const Switch = <T extends {}>({
  children,
  value,
  onChange
}: ISwitchProps<T>) => {
  return (
    <StyledSwitch>
      {React.Children.map(children, (child, idx) => {
        const { value: childValue } = child.props;

        return (
          <Fragment>
            <StyledControl
              onChange={() => onChange(childValue)}
              type="radio"
              checked={childValue === value}
              id={idx.toString()}
            />
            {cloneElement(child, { htmlFor: idx.toString() })}
          </Fragment>
        );
      })}
    </StyledSwitch>
  );
};

Switch.Item = StyledBox;
