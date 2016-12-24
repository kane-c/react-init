import React, { PropTypes } from 'react';

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
    const { children, className, component, ...otherProps } = props;
    const Component = component || defaultComponent;

    const classNames = [fixedClassName];

    if (className) {
      classNames.push(className);
    }

    return (
      <Component className={classNames.join(' ')} {...otherProps}>
        {children}
      </Component>
    );
  };

  component.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.string,
  };

  return component;
}
