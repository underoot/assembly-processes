import React from 'react';
import { shallow, mount } from 'enzyme';

import { Icon } from 'common/components/Icon';

it('renders without crashing', () => {
  shallow(<Icon type="trash" />);
});

it('reacts on enter keydown as click', () => {
  const onClick = jest.fn();
  const node = mount(<Icon type="close" onClick={onClick} />);

  node.getDOMNode().addEventListener('click', onClick);
  node.simulate('keydown', { key: 'Enter' });

  expect(onClick).toBeCalled();
});

it('not reacts on enter keydown as click', () => {
  const onClick = jest.fn();
  const node = mount(<Icon type="close" onClick={onClick} />);

  node.getDOMNode().addEventListener('click', onClick);
  node.simulate('keydown', { key: 'Esc' });

  expect(onClick).not.toBeCalled();
});
