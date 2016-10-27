// @flow
import React from 'react';
import { shallow } from 'enzyme';

import App from 'containers/App';

describe('<App />', () => {
  it('should render its children', () => {
    const component = shallow(
      <App>
        <p>Child here</p>
      </App>,
    );

    expect(component.find('p').text().includes('Child here')).toBe(true);
  });
});
