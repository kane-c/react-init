import express from 'express';
import Helmet from 'react-helmet';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { matchPath } from 'react-router-dom';

import routes from 'routes';
import Html from 'components/Html';
import App from 'containers/App';

import { browserConfig, manifest } from 'favicons';
import { getRoot, getStore } from 'common';

const app = express();

// More mystery, less advertising
app.disable('x-powered-by');

// Don't listen in test, otherwise the process will never finish
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  // 8080 is officially assigned as an alternative HTTP port
  // https://www.iana.org/assignments/service-names-port-numbers/
  // service-names-port-numbers.xhtml
  app.listen(8080);
}

/* istanbul ignore next */
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
  // eslint-disable-next-line global-require
  const compression = require('compression');

  app.use(compression());
}

let assets;

/* istanbul ignore if */
if (process.env.NODE_ENV === 'production') {
  const fs = require('fs'); // eslint-disable-line global-require
  // Can't simply use `require` here, as we don't want to bundle this file
  assets = JSON.parse(fs.readFileSync('build/assets.json', 'utf8'));
} else {
  assets = {
    assets: [],
    entries: {
      main: {},
    },
  };
}

app.use(express.static('build/static'));
app.use('/browserconfig.xml', browserConfig());
app.use('/manifest.json', manifest());

app.use((req, res) => {
  const store = getStore();
  const promises = [];

  // Find the component that matches the route. Check if it requires any sagas
  // to preload and execute them
  routes.some((route) => {
    const match = matchPath(req.url, route);

    if (match && route.component.preloadSagas) {
      const sagas = route.component.preloadSagas.map(saga =>
        store.runSaga(saga).done);
      promises.push(...sagas);
    }

    return match;
  });

  const router = (
    <StaticRouter context={{}} location={req.url}>
      <App />
    </StaticRouter>
  );

  Promise.all(promises).then(() => {
    const context = {};

    const staticRouter = (
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    const bodyHtml = renderToString(getRoot(store, staticRouter));

    if (context.url) {
      res.writeHead(301, {
        Location: context.url,
      });
      res.end();
    } else {
      const head = Helmet.renderStatic();
      const preloadedState = store.getState();
      const cssUrl = assets.entries.main.css || '/main.css';
      const jsUrl = assets.entries.main.js || '/client.js';
      const root = (
        <Html
          bodyHtml={bodyHtml}
          cssUrl={cssUrl}
          head={head}
          jsUrl={jsUrl}
          preloadedState={preloadedState}
        />
      );
      const html = `<!doctype html>${renderToStaticMarkup(root)}`;
      res.status(context.status || 200).send(html);
      res.end();
    }
  });

  renderToString(getRoot(store, router));
  store.close();
});
