import React from 'react';
import { fromJS } from 'immutable';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import { getRoot, getRoutes, getStore } from 'common';

const preloadedState = fromJS(window.PRELOADED_STATE);
delete window.PRELOADED_STATE;

let devTools;

if (process.env.NODE_ENV === 'development') {
  // Prefer using JS generated CSS during development
  document.getElementById('main-css').remove();

  devTools = window.devToolsExtension && window.devToolsExtension();
}

const store = getStore(preloadedState, routerMiddleware(browserHistory),
  devTools);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toJS();
  },
});

if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
  window.devToolsExtension.updateStore(store);
}

const routes = getRoutes(store);

/**
 * Run the route's component's sagas.
 * Assumes sagas fork but watch for route change and cancel themselves,
 * otherwise you could end up with multiple instances of the saga running.
 * @param {function} Component React component to render
 * @param {Object} props Properties to render
 * @return {Object} React node
 */
function createElement(Component, props) {
  (Component.preloadSagas || []).map(store.runSaga);

  return <Component {...props} />;
}

const router = (
  <Router createElement={createElement} history={history}>
    {routes}
  </Router>
);

render(getRoot(store, router), document.getElementById('root'));
