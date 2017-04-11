import PropTypes from 'prop-types';
import React from 'react';

/**
 * Bootstrap 4 card image component.
 *
 * Optionally pass `position` to modify the class name.
 *
 * @param {Object} props React props.
 * @return {Object} React node.
 */
export default function CardImage(props) {
  const { className, position, ...otherProps } = props;

  const classNames = [];

  if (position === 'bottom') {
    classNames.push('card-img-bottom');
  } else if (position === 'top') {
    classNames.push('card-img-top');
  } else {
    classNames.push('card-img');
  }

  if (className) {
    classNames.push(className);
  }

  return <img className={classNames.join(' ')} {...otherProps} />; // eslint-disable-line max-len, jsx-a11y/img-has-alt
}

CardImage.propTypes = {
  className: PropTypes.string,
  position: PropTypes.oneOf(['bottom', 'top']),
};

CardImage.defaultProps = {
  className: null,
  position: null,
};
