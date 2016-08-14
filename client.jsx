import { render } from 'react-dom';
import { createStore } from 'redux';
import { browserHistory, Router } from 'react-router';
import React from 'react';

import createReducer from './reducers';
import getRoot, { routes } from './common';

const initialState = window.INITIAL_STATE;
delete window.INITIAL_STATE;

let devTools;

if (process.env.NODE_ENV === 'development') {
  // Prefer using JS generated CSS during development
  document.getElementById('main-css').remove();

  devTools = window.devToolsExtension && window.devToolsExtension();
}

const store = createStore(createReducer(), initialState, devTools);

const router = (
  <Router history={browserHistory}>
    {routes}
  </Router>
);

render(getRoot(store, router), document.getElementById('root'));
