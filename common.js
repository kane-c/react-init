import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Provider } from 'react-redux';

import About from './components/About';
import Home from './components/Home';
import App from './containers/App';


export const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route component={About} path="about" />
  </Route>
);

export default function getRoot(store, router) {
  return (
    <Provider store={store}>
      {router}
    </Provider>
  );
}
