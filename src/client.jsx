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

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  // Prefer using JS generated CSS during development
  const cssElement = document.getElementById('main-css');

  if (cssElement) {
    cssElement.remove();
  }
}

const history = createHistory();
const store = getStore(preloadedState, routerMiddleware(history));

/**
 * Render the app and its containing root components.
 * @param {Object} AppComponent React component.
 * @return {void}
 */
function renderApp(AppComponent) {
  const router = (
    <ConnectedRouter history={history}>
      <AppComponent />
    </ConnectedRouter>
  );

  render(
    <AppContainer>
      {getRoot(store, router)}
    </AppContainer>,
    document.getElementById('root'),
  );
}

renderApp(App);

/* istanbul ignore next */
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    // Even though Webpack 2 supports native ES2015 modules, we need to import
    // again for hot reloading to work correctly
    /* eslint-disable global-require */
    const NewApp = require('./containers/App').default;
    /* eslint-enable global-require */

    renderApp(NewApp);
  });
}

// Install ServiceWorker and AppCache at the end since it's not the most
// important operation and if the main code fails, we do not want it installed
/* istanbul ignore next */
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
