import { fromJS } from 'immutable';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import React from 'react';

import { getRoot, getRoutes, getStore } from './common';

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

const router = (
  <Router history={history}>
    {routes}
  </Router>
);

render(getRoot(store, router), document.getElementById('root'));
