import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import React from 'react';

import { getRoot, getStore, routes } from './common';

const initialState = window.INITIAL_STATE;
delete window.INITIAL_STATE;

let devTools;

if (process.env.NODE_ENV === 'development') {
  // Prefer using JS generated CSS during development
  document.getElementById('main-css').remove();

  devTools = window.devToolsExtension && window.devToolsExtension();
}

const store = getStore(initialState, devTools);
const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Router history={history}>
    {routes}
  </Router>
);

render(getRoot(store, router), document.getElementById('root'));
