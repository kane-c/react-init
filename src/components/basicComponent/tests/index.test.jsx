// @flow
import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';

import basicComponent from 'components/basicComponent';

describe('basicComponent()', () => {
  const MyComponent = basicComponent('my-class');

  it('should use a default component type', () => {
    const component = shallow(
      <MyComponent />,
    );

    expect(component.find('div')).toBeDefined();
  });

  it('should make a simple HTML class component', () => {
    expect(MyComponent.propTypes).toEqual({
      children: PropTypes.node,
      className: PropTypes.string,
      component: PropTypes.string,
    });

    const component = shallow(
      <MyComponent className="test" component="foo">
        <p>Child here</p>
      </MyComponent>,
    );

    expect(component.prop('className')).toBe('my-class test');
    expect(component.find('foo')).toBeDefined();
    expect(component.find('p').text().includes('Child here')).toBe(true);
  });
});
