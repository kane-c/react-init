import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import About from '..';

describe('<About />', () => {
  it('should render', () => {
    const component = shallow(
      <About />,
    );

    expect(component).to.contain.text('About');
  });
});
