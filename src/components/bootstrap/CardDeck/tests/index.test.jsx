import React from 'react';
import { shallow } from 'enzyme';

import CardDeck from 'components/bootstrap/CardDeck';

describe('<CardDeck />', () => {
  it('should render its children', () => {
    const component = shallow(
      <CardDeck>
        <p>Child here</p>
      </CardDeck>,
    );

    expect(component.find('p').text()).toEqual(
      expect.stringContaining('Child here'),
    );
  });
});
