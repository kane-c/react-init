import { render } from 'react-dom';
import { createStore } from 'redux';
import { browserHistory, Router } from 'react-router';
import React from 'react';

import createReducer from './reducers';
import getRoot, { routes } from './common';

const initialState = window.INITIAL_STATE;
delete window.INITIAL_STATE;

// Prefer using JS generated CSS during development
if (process.env.NODE_ENV === 'development') {
  document.getElementById('main-css').remove();
}

const store = createStore(createReducer(), initialState);

const router = (
  <Router history={browserHistory}>
    {routes}
  </Router>
);

render(getRoot(store, router), document.getElementById('root'));
