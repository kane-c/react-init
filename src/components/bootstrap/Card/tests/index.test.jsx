import React from 'react';
import { shallow } from 'enzyme';

import Card from 'components/bootstrap/Card';

describe('<Card />', () => {
  it('should render a custom component type', () => {
    const component = shallow(<Card component="foo" />);

    expect(component.find('foo')).toBeDefined();
  });

  it('should support blocks', () => {
    const component = shallow(<Card block />);

    expect(component.prop('className')).toBe('card card-block');
  });

  it('should support inverse', () => {
    const component = shallow(<Card inverse />);

    expect(component.prop('className')).toBe('card card-inverse');
  });

  it('should allow for variants', () => {
    const component = shallow(<Card variant="primary" />);

    expect(component.prop('className')).toBe('card card-primary');
  });

  it('should allow for outline variants', () => {
    const component = shallow(<Card outline variant="primary" />);

    expect(component.prop('className')).toBe('card card-outline-primary');
  });

  it('should allow a class name', () => {
    const component = shallow(<Card className="test" />);

    expect(component.prop('className')).toBe('card test');
  });

  it('should render its children', () => {
    const component = shallow(
      <Card>
        <p>Child here</p>
      </Card>,
    );

    expect(component.find('p').text().includes('Child here')).toBe(true);
  });
});
