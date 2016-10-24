import React from 'react';

/**
 * Bootstrap 4 card deck component.
 *
 * If you are using flexbox mode, pass the prop `flexbox` to remove the wrapper
 * div.
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

  if (!props.flexbox) {
    return (
      <div className="card-deck-wrapper">
        {deck}
      </div>
    );
  }

  return deck;
}

CardDeck.propTypes = {
  children: React.PropTypes.node.isRequired,
  flexbox: React.PropTypes.bool,
};
