import express from 'express';
import Helmet from 'react-helmet';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { createStore } from 'redux';

import createReducer from './reducers';
import getRoot, { routes } from './common';

const app = express();

// 8080 is officially assigned as an alternative HTTP port
// https://www.iana.org/assignments/service-names-port-numbers/
// service-names-port-numbers.xhtml
const port = 8080;

app.listen(port, () => {
  process.stdout.write(`Server ready: http://localhost:${port}\n`);
});

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddlware = require('webpack-hot-middleware');

  const config = require('./webpack.config.babel');
  /* eslint-enable global-require, import/no-extraneous-dependencies */
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));

  app.use(webpackHotMiddlware(compiler));
}

app.use('/static', express.static('build/static'));

/**
 * Render the full HTML for a page, initialising the Redux state.
 */
function renderFullPage(html, initialState, head) {
  // Add an ID attribute in development mode so it can be deleted on page load.
  // The ensures CSS is present on the page for users without JS, but allows
  // reloading and dynamic styles for those with JS enabled
  const css = `<link href="/static/main.css" rel="stylesheet"${
    process.env.NODE_ENV === 'development' ? ' id="main-css"' : ''} />`;

  const dll = process.env.NODE_ENV === 'development' ?
    '<script src="/static/dll.js"></script>' : '';

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    ${head.title.toString()}
    ${head.meta.toString()}
    ${css}
    ${head.link.toString()}
  </head>
  <body>
    <div id="root">${html}</div>
    <script>window.INITIAL_STATE=${JSON.stringify(initialState)}</script>
    ${dll}
    <script src="/static/client.js"></script>
  </body>
</html>
`;
}

/**
 * Render a response.
 */
function handleRender(req, res) {
  match({
    location: req.url,
    routes,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      const store = createStore(createReducer());

      const routerContext = <RouterContext {...renderProps} />;

      const html = renderToString(getRoot(store, routerContext));
      const head = Helmet.rewind();
      const initialState = store.getState();

      res.status(200).send(renderFullPage(html, initialState, head));
    } else {
      res.status(404).send('Not found');
    }
  });
}

app.use(handleRender);
