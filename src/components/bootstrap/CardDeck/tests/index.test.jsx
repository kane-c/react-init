import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import CardDeck from 'components/bootstrap/CardDeck';

describe('<CardDeck />', () => {
  it('should render its children', () => {
    const component = shallow(
      <CardDeck>
        <p>Child here</p>
      </CardDeck>
    );

    expect(component.find('p')).to.include.text('Child here');
  });

  it('should not have a wrapper in flexbox mode', () => {
    let component = shallow(<CardDeck />);

    expect(component.find('.card-deck-wrapper')).to.be.present();

    component = shallow(<CardDeck flexbox />);

    expect(component.find('.card-deck-wrapper')).to.not.be.present();
  });
});
