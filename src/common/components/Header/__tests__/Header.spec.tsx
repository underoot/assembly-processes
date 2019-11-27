import React from 'react';
import { shallow } from 'enzyme';

import { Header, StyledTitle } from 'common/components/Header';

describe('without title', () => {
  it('renders without crashing', () => {
    shallow(<Header />);
  });

  it('contains title', () => {
    expect(shallow(<Header />).contains(<StyledTitle />)).toBe(false);
  });
});

describe('with title', () => {
  it('renders without crashing', () => {
    shallow(<Header title="Some" />);
  });

  it('contains title', () => {
    expect(
      shallow(<Header title="Some" />).contains(<StyledTitle>Some</StyledTitle>)
    ).toBe(true);
  });
});
