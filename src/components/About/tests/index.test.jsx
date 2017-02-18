import React from 'react';
import { shallow } from 'enzyme';

import About from '..';

describe('<About />', () => {
  it('should render', () => {
    const component = shallow(
      <About />,
    );

    // Replace with expect(...).stringContains with Jest 19+
    expect(component.text().includes('About')).toBe(true);
  });
});
