// @flow
import express from 'express';
import Helmet from 'react-helmet';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import { browserConfig, getFaviconHtml, manifest } from 'favicons';
import getRoutes from 'Routes';
import { getRoot, getStore } from 'common';

const app = express();

// More mystery, less advertising
app.disable('x-powered-by');

// Don't listen in test, otherwise the process will never finish
if (process.env.NODE_ENV !== 'test') {
  // 8080 is officially assigned as an alternative HTTP port
  // https://www.iana.org/assignments/service-names-port-numbers/
  // service-names-port-numbers.xhtml
  const port = 8080;

  app.listen(port, () => {
    process.stdout.write(`Server ready: http://localhost:${port}\n`);
  });
}

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable global-require */
  const DashboardPlugin = require('webpack-dashboard/plugin');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddlware = require('webpack-hot-middleware');

  const config = require('../webpack.config.babel');
  /* eslint-enable global-require */
  const compiler = webpack(config);

  compiler.apply(new DashboardPlugin());

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));

  app.use(webpackHotMiddlware(compiler));
} else {
  // Gzip in production
  /* eslint-disable global-require */
  const compression = require('compression');
  /* eslint-enable global-require */

  app.use(compression());
}

let assets;

if (process.env.NODE_ENV === 'production') {
  const fs = require('fs'); // eslint-disable-line global-require
  // Can't simply use `require` here, as we need the file to not be bundled by
  // webpack
  assets = JSON.parse(fs.readFileSync('build/assets.json', 'utf8'));
} else {
  assets = {
    assets: [],
    entries: {
      main: {},
    },
  };
}

/**
 * Escape a string for use in a regular expression.
 *
 * @param {String} str String to escape.
 * @return {String} Escaped string.
 */
function escapeRegExp(str) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}

/**
 * Generate a regexp to test for a cache busted version of a given file name.
 * The expression is `^basename.hash.ext$`
 *
 * @param {String} name File name.
 * @return {RegExp} Regular expression instance.
 */
function getCacheBustRegex(name) {
  let ext = name.split('.').pop();
  const baseName = escapeRegExp(name.substr(0, name.length - ext.length));
  ext = escapeRegExp(ext);

  return new RegExp(`^${baseName}[a-f0-9]{7}\\.${ext}$`);
}

/**
 * Loop through the assets array to find a match for the given name.
 * Names in the manifest are hashed; this function encapsulates that. If no
 * cache busted file is found, the given path is returned.
 *
 * @param {String} name Asset file name/path.
 * @return {String} Path to cache busted asset.
 */
assets.get = (name) => {
  const asset = assets.assets.find(
    asset => asset.path === name || getCacheBustRegex(name).test(asset.path),
  );

  return asset ? asset.path : name;
};

app.use(express.static('build/static'));
app.use('/browserconfig.xml', browserConfig(assets));
app.use('/manifest.json', manifest(assets));

/**
 * Render the full HTML for a page, initialising the Redux state.
 * @param {string} html Inner HTML rendered by React
 * @param {Object} preloadedState Initial Redux store state
 * @param {Object} head Helmet instance
 * @return {string} Full page HTML
 */
function renderFullPage(html: string, preloadedState: Object,
  head: Object): string {
  const cssUrl = assets.entries.main.css || '/main.css';
  const jsUrl = assets.entries.main.js || '/client.js';
  // Add an ID attribute in development mode so it can be deleted on page load.
  // The ensures CSS is present on the page for users without JS, but allows
  // reloading and dynamic styles for those with JS enabled
  const css = `<link href="${cssUrl}" rel="stylesheet"${
    process.env.NODE_ENV === 'development' ? ' id="main-css"' : ''} />`;

  const dll = process.env.NODE_ENV === 'development' ?
    '<script src="/dll.js"></script>' : '';

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta content="ie=edge" http-equiv="x-ua-compatible" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    ${head.title.toString()}
    ${head.meta.toString()}
    ${css}
    ${head.link.toString()}
    ${getFaviconHtml(assets)}
  </head>
  <body>
    <div id="root">${html}</div>
    <script>window.PRELOADED_STATE=${JSON.stringify(preloadedState)}</script>
    ${dll}
    <script src="${jsUrl}"></script>
  </body>
</html>
`;
}

const routes = getRoutes();

/**
 * Render a response.
 * @param {Object} req Request
 * @param {Object} res Response
 * @return {void}
 */
function handleRender(req: Object, res: Object) {
  const store = getStore();

  match({
    location: req.url,
    routes,
  }, (error: ?Object, redirectLocation: Object, renderProps: Object) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      const routerContext = <RouterContext {...renderProps} />;

      // Find all the sagas required by the pages's components and run them,
      // rendering the result after they all complete
      Promise.all(renderProps.components.reduce(
          (sagas: ?Generator[], component: Object): Generator[] => (
        component.preloadSagas || []
          ).concat(sagas), [],
        ).map(
          (saga: Generator): Function => store.runSaga(saga).done),
        )
        .then(() => {
          const html = renderToString(getRoot(store, routerContext));
          const head = Helmet.rewind();
          const preloadedState = store.getState();

          // TODO Find a way to 404 if an Ajax call hits a 404
          res.status(200).send(renderFullPage(html, preloadedState, head));
        })
        .catch((exception: Object) => {
          res.status(500).send(exception.message);
          throw exception;
        });

      // Need to render once so that the Saga actions get dispatched
      renderToString(getRoot(store, routerContext));
      store.close();
    } else {
      res.status(404).send('Not found');
    }
  });
}

app.use(handleRender);

export default app;
