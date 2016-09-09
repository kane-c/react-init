import React from 'react';

/**
 * Function that creates a new component. The tag/component itself is a prop
 * with a default component tag (e.g. `div`) and a fixed class name. Additional
 * class names can be passed to the created component.
 * @param {String} fixedClassName CSS class name to always include
 * @param {String} [defaultComponent] Component or HTML tag
 * @return {Function} New component
 */
export default function basicComponent(fixedClassName,
                                       defaultComponent = 'div') {
  const component = function SubComponent(props) {
    const Component = props.component || defaultComponent;

    const className = [fixedClassName];

    if (props.className) {
      className.push(props.className);
    }

    return (
      <Component className={className.join(' ')}>
        {props.children}
      </Component>
    );
  };

  component.propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    component: React.PropTypes.string,
  };

  return component;
}
