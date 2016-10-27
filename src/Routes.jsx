import React from 'react';
import { IndexRoute, Route } from 'react-router';

import About from 'components/About';
import App from 'containers/App';
import Home from 'containers/Home';

/**
 * Get the React Router routes for the app.
 * @return {Object} Route hierarchy
 */
export default function Routes(): Object {
  return (
    <Route component={App} path="/">
      <IndexRoute component={Home} />
      <Route component={About} path="about" />
    </Route>
  );
}
