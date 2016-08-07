import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { createStore } from 'redux';

import createReducer from './reducers';
import getRoot, { routes } from './common';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

// 8080 is officially assigned as an alternative HTTP port
// https://www.iana.org/assignments/service-names-port-numbers/
// service-names-port-numbers.xhtml
const port = 8080;

app.listen(port, () => {
  console.log(`Server ready: http://localhost:${port}`);
});

if (process.env.NODE_ENV === 'development') {
  const config = require('./webpack.config.babel');
  const webpack = require('webpack');
  const compiler = webpack(config);

  const webpackDevMiddleware = require('webpack-dev-middleware');
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));

  const webpackHotMiddlware = require('webpack-hot-middleware');
  app.use(webpackHotMiddlware(compiler));
} else {
  app.use('/static', express.static('build/static'));
}

function renderFullPage(html, initialState) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Redux Universal Example</title>
  </head>
  <body>
    <div id="root">${html}</div>
    <script>window.__INITIAL_STATE__=${JSON.stringify(initialState)}</script>
    <script src="/static/client.js"></script>
  </body>
</html>
`;
}

function handleRender(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
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

      const initialState = store.getState();

      res.status(200).send(renderFullPage(html, initialState));
    } else {
      res.status(404).send('Not found');
    }
  });
}

app.use(handleRender);
