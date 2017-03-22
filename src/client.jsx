import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { fromJS } from 'immutable';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import App from 'containers/App';

import 'favicons';
import { getRoot, getStore } from 'common';

const preloadedState = fromJS(window.PRELOADED_STATE);
delete window.PRELOADED_STATE;

let devTools;

if (process.env.NODE_ENV === 'development') {
  // Prefer using JS generated CSS during development
  document.getElementById('main-css').remove();

  devTools = window.devToolsExtension && window.devToolsExtension();
}

const history = createHistory();
const store = getStore(preloadedState, routerMiddleware(history),
  devTools);

const router = (
  <ConnectedRouter history={history}>
    <App />
  </ConnectedRouter>
);

render(getRoot(store, router), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    // Even though Webpack 2 supports native ES2015 modules, we need to import
    // again for hot reloading to work correctly
    /* eslint-disable global-require */
    const NewApp = require('./containers/App').default;
    /* eslint-enable global-require */

    render(
      <AppContainer>
        {getRoot(store, <ConnectedRouter history={history}>
          <NewApp />
        </ConnectedRouter>)}
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}

// Install ServiceWorker and AppCache at the end since it's not the most
// important operation and if the main code fails, we do not want it installed
if (process.env.NODE_ENV === 'production') {
  /* eslint-disable global-require */
  const OfflinePluginRuntime = require('offline-plugin/runtime');
  /* eslint-enable global-require */

  // Enable any updated cache to take effect immediately, otherwise it won't
  // happen until the user closes all instances of the page/
  OfflinePluginRuntime.install({
    onUpdating: () => undefined,
    onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
    onUpdated: () => window.location.reload(),
    onUpdateFailed: () => undefined,
  });
}
