import { IndexRoute, Route } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import React from 'react';
import createSagaMiddleware, { END } from 'redux-saga';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import createReducer from './reducers';
import About from './components/About';
import App from './containers/App';
import Home from './containers/Home';
import HomeSagas from './containers/Home/sagas';
import homeReducer from './containers/Home/reducer';

const sagas = [
  ...HomeSagas,
];

const reducers = {
  home: homeReducer,
};

/**
 * Get the routes for the app.
 * @return {Object} React node
 */
export function getRoutes() {
  return (
    <Route component={App} path="/">
      <IndexRoute component={Home} />
      <Route component={About} path="about" />
    </Route>
  );
}

const sagaMiddleware = createSagaMiddleware();

/**
 * Get a store instance.
 * @param {Object} [preloadedState] Initial store state
 * @param {Object} routerMiddleware React Router middleware instance
 * @param {Object} [devTools] Redux Dev Tools instance
 * @return {Object} Redux store instance
 */
export function getStore(preloadedState, routerMiddleware, devTools) {
  let middleware = [sagaMiddleware];
  if (routerMiddleware) {
    middleware.push(routerMiddleware);
  }

  middleware = applyMiddleware(...middleware);

  if (devTools) {
    middleware = compose(middleware, devTools);
  }

  const store = createStore(createReducer(reducers), preloadedState,
    middleware);

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  sagas.map(sagaMiddleware.run);

  // Make reducers hot reloadable
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      System.import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(reducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}

/**
 * Get the root React component.
 * @param {Object} store Redux store
 * @param {Object} router Router JSX component
 * @return {Object} React node
 */
export function getRoot(store, router) {
  return (
    <Provider store={store}>
      {router}
    </Provider>
  );
}
