import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Card from 'components/bootstrap/Card';

describe('<Card />', () => {
  it('should render a custom component type', () => {
    const component = shallow(<Card component="foo" />);

    expect(component.find('foo')).to.be.present();
  });

  it('should support blocks', () => {
    const component = shallow(<Card block />);

    expect(component).to.have.prop('className', 'card card-block');
  });

  it('should support inverse', () => {
    const component = shallow(<Card inverse />);

    expect(component).to.have.prop('className', 'card card-inverse');
  });

  it('should allow for variants', () => {
    const component = shallow(<Card variant="primary" />);

    expect(component).to.have.prop('className', 'card card-primary');
  });

  it('should allow for outline variants', () => {
    const component = shallow(<Card outline variant="primary" />);

    expect(component).to.have.prop('className', 'card card-outline-primary');
  });

  it('should allow a class name', () => {
    const component = shallow(<Card className="test" />);

    expect(component).to.have.prop('className', 'card test');
  });

  it('should render its children', () => {
    const component = shallow(
      <Card>
        <p>Child here</p>
      </Card>
    );

    expect(component.find('p')).to.include.text('Child here');
  });
});
