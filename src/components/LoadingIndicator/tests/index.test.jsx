import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from '..';

describe('<LoadingIndicator />', () => {
  it('should render', () => {
    const component = shallow(<LoadingIndicator />);

    expect(component.text()).toEqual(expect.stringContaining('Loading...'));
  });
});
