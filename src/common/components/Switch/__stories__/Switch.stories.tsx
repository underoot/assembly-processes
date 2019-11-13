import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Switch } from 'common/components/Switch';

enum SortOrder {
  LATEST,
  OLD
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

storiesOf('Switch', module).add('General', () => <SwitchGeneral />);
