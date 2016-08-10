import { IndexRoute, Route } from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';

import About from './components/About';
import App from './containers/App';
import Home from './components/Home';

export const routes = (
  <Route component={App} path="/">
    <IndexRoute component={Home} />
    <Route component={About} path="about" />
  </Route>
);

/**
 * Get the root React component.
 *
 * @param {object} store Redux store
 * @param {object} router Router JSX component
 */
export default function getRoot(store, router) {
  return (
    <Provider store={store}>
      {router}
    </Provider>
  );
}
