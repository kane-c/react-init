import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import basicComponent from 'components/basicComponent';

describe('basicComponent()', () => {
  const MyComponent = basicComponent('my-class');

  it('should make a simple HTML class component', () => {
    expect(MyComponent.propTypes).to.deep.equal({
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      component: React.PropTypes.string,
    });

    const component = shallow(
      <MyComponent className="test" component="foo">
        <p>Child here</p>
      </MyComponent>,
    );

    expect(component).to.have.prop('className', 'my-class test');
    expect(component.find('foo')).to.be.present();
    expect(component.find('p')).to.have.text('Child here');
  });
});
