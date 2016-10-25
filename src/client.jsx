import OfflinePluginRuntime from 'offline-plugin/runtime';
import React from 'react';
import { fromJS } from 'immutable';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import 'favicons';
import getRoutes from 'Routes';
import { getRoot, getStore } from 'common';

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

const router = (
  <Router history={history}>
    {getRoutes()}
  </Router>
);

render(getRoot(store, router), document.getElementById('root'));

// Install ServiceWorker and AppCache at the end since it's not the most
// important operation and if the main code fails, we do not want it installed
if (process.env.NODE_ENV === 'production') {
  // Enable any updated cache to take effect immediately, otherwise it won't
  // happen until the user closes all instances of the page/
  OfflinePluginRuntime.install({
    onUpdating: () => undefined,
    onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
    onUpdated: () => window.location.reload(),
    onUpdateFailed: () => undefined,
  });
}
