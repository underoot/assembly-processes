import React from 'react';
import { storiesOf } from '@storybook/react';

import * as icons from 'common/components/Icon/assets';
import { Icon } from 'common/components/Icon';
import { IIconProps } from 'common/components/Icon/types';

storiesOf('Icon', module).add('General', () => (
  <div style={{ backgroundColor: '#ccc' }}>
    {Object.keys(icons).map(icon => (
      <Icon type={icon as IIconProps['type']} key={icon} />
    ))}
  </div>
));
