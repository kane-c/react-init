import React from 'react';
import { shallow } from 'enzyme';

import App from 'containers/App';

describe('<App />', () => {
  it('should render', () => {
    const component = shallow(<App />);

    expect(component).toBeDefined();
  });
});
