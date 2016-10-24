import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import CardImage from 'components/bootstrap/CardImage';

describe('<CardImage />', () => {
  it('should support various positions', () => {
    expect(shallow(<CardImage position="bottom" />)).to.have.prop(
      'className', 'card-img-bottom'
    );
    expect(shallow(<CardImage position="top" />)).to.have.prop(
      'className', 'card-img-top'
    );
    expect(shallow(<CardImage />)).to.have.prop('className', 'card-img');
  });

  it('should support passing a CSS class and other props', () => {
    const component = shallow(
      <CardImage className="test" isTest="yes" />
    );

    expect(component).to.have.prop('className', 'card-img test');
    expect(component).to.have.prop('isTest', 'yes');
  });
});
