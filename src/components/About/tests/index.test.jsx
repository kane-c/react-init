import React from 'react';
import { shallow } from 'enzyme';

import About from '..';

describe('<About />', () => {
  it('should render', () => {
    const component = shallow(
      <About />,
    );

    expect(component.text()).toEqual(expect.stringContaining('About'));
  });
});
