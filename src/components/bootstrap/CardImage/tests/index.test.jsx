import React from 'react';
import { shallow } from 'enzyme';

import CardImage from 'components/bootstrap/CardImage';

describe('<CardImage />', () => {
  it('should support various positions', () => {
    expect(shallow(<CardImage position="bottom" />).prop('className'))
      .toBe('card-img-bottom');
    expect(shallow(<CardImage position="top" />).prop('className'))
      .toBe('card-img-top');
    expect(shallow(<CardImage />).prop('className')).toBe('card-img');
  });

  it('should support passing a CSS class and other props', () => {
    const component = shallow(
      <CardImage alt="Description" className="test" />,
    );

    expect(component.prop('className')).toBe('card-img test');
    expect(component.prop('alt')).toBe('Description');
  });
});
