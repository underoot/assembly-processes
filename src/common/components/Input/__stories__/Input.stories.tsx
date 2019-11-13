import React from 'react';
import { storiesOf } from '@storybook/react';

import { Input } from 'common/components/Input';
import { Icon } from 'common/components/Icon';

storiesOf('Input', module)
  .add('General', () => <Input placeholder="Search by name" />)
  .add('With icon', () => (
    <Input
      icon={<Icon type="search" />}
      placeholder="Search by assembly name"
    />
  ));
