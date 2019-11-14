import React, { Fragment, cloneElement } from 'react';
import styled from '@emotion/styled';

import { ISwitchProps, ISwitchItemProps } from 'common/components/Switch/types';

const StyledSwitch = styled.div`
  margin-left: 16px;
  margin-right: 16px;
`;

const StyledItem = styled.label<ISwitchItemProps>`
  cursor: pointer;

  display: inline-block;
  position: relative;

  padding: 4px 36px;

  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 21px;

  margin-left: -16px;
  margin-right: -16px;

  background-color: var(--color-background-control);
  font: var(--paragraph-size-medium);
  color: var(--color-primary);

  input:focus + & {
    border: 1px solid var(--color-focus);
  }

  input:checked + & {
    z-index: 1;
    background-color: var(--color-default);
    color: var(--color-active);
    box-shadow: 0px 2px 4px rgba(55, 88, 123, 0.16),
      0px 2px 4px rgba(0, 0, 0, 0.06);
  }
`;

export const StyledControl = styled.input`
  width: 0px;
  height: 0px;
  position: absolute;
  left: -999px;
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

Switch.Item = StyledItem;
