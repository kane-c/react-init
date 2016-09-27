import React from 'react';

import basicComponent from 'components/basicComponent';

/**
 * Bootstrap 4 card component
 * @param {Object} props React props
 * @return {Object} React node
 */
export default function Card(props) {
  const Component = props.component || 'div';

  const className = ['card'];

  if (props.block) {
    className.push('card-block');
  } else if (props.inverse) {
    className.push('card-inverse');
  }

  if (props.variant) {
    className.push(`card-${props.outline ? 'outline-' : ''}${props.variant}`);
  }

  if (props.className) {
    className.push(props.className);
  }

  return (
    <Component className={className.join(' ')}>
      {props.children}
    </Component>
  );
}

Card.propTypes = {
  block: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  component: React.PropTypes.string,
  inverse: React.PropTypes.bool,
  outline: React.PropTypes.bool,
  variant: React.PropTypes.oneOf([
    'primary', 'secondary', 'success', 'info', 'warning', 'danger',
  ]),
};

export const CardBlock = basicComponent('card-block');
export const CardColumns = basicComponent('card-columns');
export const CardFooter = basicComponent('card-footer');
export const CardGroup = basicComponent('card-group');
export const CardHeader = basicComponent('card-header');
export const CardImageOverlay = basicComponent('card-img-overlay');
export const CardLink = basicComponent('card-link', 'a');
CardLink.propTypes.href = React.PropTypes.string.isRequired;
export const CardQuote = basicComponent('card-blockquote', 'blockquote');
export const CardTitle = basicComponent('card-title', 'h3');
export const CardSubtitle = basicComponent('card-subtitle', 'p');
export const CardText = basicComponent('card-text', 'p');
// TODO CardDeck
// TODO card-header-tabs/pills
// TODO CardImage
