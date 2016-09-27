import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import LoadingIndicator from 'components/LoadingIndicator';

describe('<LoadingIndicator />', () => {
  it('should render', () => {
    const component = shallow(<LoadingIndicator />);

    expect(component).to.include.text('Loading...');
  });
});
