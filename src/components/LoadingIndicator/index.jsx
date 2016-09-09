import Icon from 'react-fontawesome';
import React from 'react';

/**
 * React component to indicate loading with a spinning icon.
 * @return {Object} React node
 */
export default function LoadingIndicator() {
  return (
    <span>
      <Icon fixedWidth name="spinner" pulse />
      <span className="sr-only">Loading...</span>
    </span>
  );
}
