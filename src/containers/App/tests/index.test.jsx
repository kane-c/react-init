import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from 'containers/App';

describe('<App />', () => {
  it('should render its children', () => {
    const component = shallow(
      <App>
        <p>Child here</p>
      </App>
    );

    expect(component.find('p')).to.include.text('Child here');
  });
});
