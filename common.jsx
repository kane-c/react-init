import { IndexRoute, Route } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';

import createReducer from './reducers';
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
 * Get a store instance.
 *
 * @param {object} [initialState]
 * @param {object} [devTools]
 */
export function getStore(initialState, devTools) {
  return createStore(createReducer(), initialState, devTools);
}

/**
 * Get the root React component.
 *
 * @param {object} store Redux store
 * @param {object} router Router JSX component
 */
export function getRoot(store, router) {
  return (
    <Provider store={store}>
      {router}
    </Provider>
  );
}
