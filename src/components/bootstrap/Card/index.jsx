import React, { PropTypes } from 'react';

import basicComponent from 'components/basicComponent';

export const variants = [
  'primary', 'secondary', 'success', 'info', 'warning', 'danger',
];

/**
 * Bootstrap 4 card component
 * @param {Object} props React props
 * @return {Object} React node
 */
export default function Card(props) {
  const {
    block, children, className, component, inverse, outline, variant,
    ...otherProps
  } = props;
  const Component = component;

  const classNames = ['card'];

  if (block) {
    classNames.push('card-block');
  }

  if (inverse) {
    classNames.push('card-inverse');
  }

  if (variant) {
    classNames.push(`card-${outline ? 'outline-' : ''}${variant}`);
  }

  if (className) {
    classNames.push(className);
  }

  return (
    <Component className={classNames.join(' ')} {...otherProps}>
      {children}
    </Component>
  );
}

Card.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.string,
  inverse: PropTypes.bool,
  outline: PropTypes.bool,
  variant: PropTypes.oneOf(variants),
};

Card.defaultProps = {
  block: false,
  children: null,
  className: null,
  component: 'div',
  inverse: false,
  outline: false,
  variant: null,
};

export const CardBlock = basicComponent('card-block');
export const CardColumns = basicComponent('card-columns');
export const CardFooter = basicComponent('card-footer');
export const CardGroup = basicComponent('card-group');
export const CardHeader = basicComponent('card-header');
export const CardImageOverlay = basicComponent('card-img-overlay');
export const CardLink = basicComponent('card-link', 'a');
CardLink.propTypes.href = PropTypes.string.isRequired;
export const CardQuote = basicComponent('card-blockquote', 'blockquote');
export const CardTitle = basicComponent('card-title', 'h3');
export const CardSubtitle = basicComponent('card-subtitle', 'h6');
export const CardText = basicComponent('card-text', 'p');
export { default as CardDeck } from 'components/bootstrap/CardDeck';
export { default as CardImage } from 'components/bootstrap/CardImage';

// TODO card-header-tabs/pills
