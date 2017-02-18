import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from 'components/LoadingIndicator';

describe('<LoadingIndicator />', () => {
  it('should render', () => {
    const component = shallow(<LoadingIndicator />);

    expect(component.text().includes('Loading...')).toBe(true);
  });
});
