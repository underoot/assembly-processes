import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Switch } from 'common/components/Switch';

enum SortOrder {
  LATEST,
  OLD
}

enum Triple {
  ONE,
  TWO,
  THREE
}

const SwitchGeneral = () => {
  const [value, onChangeValue] = useState(SortOrder.LATEST);

  return (
    <Switch value={value} onChange={onChangeValue}>
      <Switch.Item value={SortOrder.LATEST}>Latest First</Switch.Item>
      <Switch.Item value={SortOrder.OLD}>Old First</Switch.Item>
    </Switch>
  );
};

const SwitchTriple = () => {
  const [value, onChangeValue] = useState(Triple.ONE);

  return (
    <Switch value={value} onChange={onChangeValue}>
      <Switch.Item value={Triple.ONE}>Vez</Switch.Item>
      <Switch.Item value={Triple.TWO}>Dos</Switch.Item>
      <Switch.Item value={Triple.THREE}>Tres</Switch.Item>
    </Switch>
  );
};

storiesOf('Switch', module)
  .add('General', () => <SwitchGeneral />)
  .add('Triple', () => <SwitchTriple />);
