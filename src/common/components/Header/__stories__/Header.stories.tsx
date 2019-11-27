import React from 'react';
import { storiesOf } from '@storybook/react';

import { Header } from 'common/components/Header';

storiesOf('Header', module)
  .add('General', () => <Header />)
  .add('With title', () => <Header title="Design2Robofacturing" />);
