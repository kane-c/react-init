import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { createStore } from 'redux';

import createReducer from './reducers';
import getRoot, { routes } from './common';

const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const store = createStore(createReducer(), initialState);

const router = (
  <Router history={browserHistory}>
    {routes}
  </Router>
);

render(getRoot(store, router), document.getElementById('root'));
