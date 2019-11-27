import React from 'react';
import { storiesOf } from '@storybook/react';

import { Loader } from 'common/components/Loader';

storiesOf('Loader', module)
  .add('General', () => <Loader />)
  .add('Small', () => <Loader size="s" />)
  .add('Large', () => <Loader size="l" />);
