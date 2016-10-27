// @flow
import Helmet from 'react-helmet';
import React from 'react';

/**
 * About page component.
 * @return {Object} React node
 */
export default function About(): Object {
  return (
    <div>
      <Helmet title="About" />
      <h1>About</h1>
    </div>
  );
}
