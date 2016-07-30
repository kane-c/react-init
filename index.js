import Express from 'express';
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'

import createReducer from './reducers';
import getRoot from './common';

const app = Express();
const port = 8080;

app.listen(port, () => {
  console.log(`Server ready: http://localhost:${port}`);
});

function renderFullPage(html, initialState) {
  return `<!doctype html>
<html>
  <head>
    <title>Redux Universal Example</title>
  </head>
  <body>
    <div id="root">${html}</div>
    <script>window.__INITIAL_STATE__=${JSON.stringify(initialState)}</script>
  </body>
</html>
`;
}

function handleRender(req, res) {
  const store = createStore(createReducer());

  const html = renderToString(getRoot());

  const initialState = store.getState();

  res.send(renderFullPage(html, initialState));
}

app.use(handleRender);
