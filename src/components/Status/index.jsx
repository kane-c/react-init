import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';

/**
 * Set the response status code as part of React Router.
 * @return {Object} React node.
 */
export default function Status({ children, code }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.status = code; // eslint-disable-line no-param-reassign
        }

        return children;
      }}
    />
  );
}

Status.propTypes = {
  children: PropTypes.element.isRequired,
  code: PropTypes.number.isRequired,
};
