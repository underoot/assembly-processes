import React, { useState, ChangeEvent } from 'react';
import { storiesOf } from '@storybook/react';

import { Input } from 'common/components/Input';
import { Icon } from 'common/components/Icon';
import { IInputProps } from 'common/components/Input/types';

const ControlledInput = (props: IInputProps) => {
  const [value, onChange] = useState('');

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  const onClear = () => {
    onChange('');
  };

  return (
    <Input
      value={value}
      onChange={onChangeInput}
      onClear={onClear}
      {...props}
    />
  );
};

storiesOf('Input', module)
  .add('General', () => <Input placeholder="Search by name" />)
  .add('With icon', () => (
    <Input
      icon={<Icon type="search" />}
      placeholder="Search by assembly name"
    />
  ))
  .add('With clear icon', () => (
    <ControlledInput placeholder="Enter your name" />
  ));
