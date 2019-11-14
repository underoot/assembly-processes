import React from 'react';
import { shallow } from 'enzyme';

import { Switch } from 'common/components/Switch';

it('renders without crashing', () => {
  shallow(
    <Switch value="Frontend" onChange={jest.fn()}>
      <Switch.Item value="Frontend">Frontend</Switch.Item>
      <Switch.Item value="Backend">Backend</Switch.Item>
    </Switch>
  );
});
