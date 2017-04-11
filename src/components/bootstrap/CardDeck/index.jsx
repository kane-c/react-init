import PropTypes from 'prop-types';
import React from 'react';

/**
 * Bootstrap 4 card deck component.
 *
 * @param {Object} props React props.
 * @return {Object} React node.
 */
export default function CardDeck(props: Object): Object {
  const deck = (
    <div className="card-deck">
      {props.children}
    </div>
  );

  return deck;
}

CardDeck.propTypes = {
  children: PropTypes.node.isRequired,
};
