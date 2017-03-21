import Helmet from 'react-helmet';
import React from 'react';

import Status from 'components/Status';

/**
 * A simple 404 page.
 * @return {Object} React node.
 */
export default function NotFound() {
  return (
    <Status code={404}>
      <h1>
        <Helmet title="Not found" />
        Not found
      </h1>
    </Status>
  );
}
