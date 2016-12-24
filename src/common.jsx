import React from 'react';
import createSagaMiddleware, { END } from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import 'bootstrap/dist/css/bootstrap-flex.css';
import 'font-awesome/css/font-awesome.css';

import createReducer from 'reducers';
import homeSagas from 'containers/Home/sagas';
import homeReducer from 'containers/Home/reducer';

const sagas = [
  ...homeSagas,
];

const reducers = {
  home: homeReducer,
};

const sagaMiddleware = createSagaMiddleware();

/**
 * Get a store instance.
 * @param {Object} [preloadedState] Initial store state
 * @param {Object} [routerMiddleware] React Router middleware instance
 * @return {Object} Redux store instance
 */
export function getStore(preloadedState, routerMiddleware) {
  let middleware = [sagaMiddleware];
  if (routerMiddleware) {
    middleware.push(routerMiddleware);
  }

  middleware = applyMiddleware(...middleware);

  /* eslint-disable no-underscore-dangle */
  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware);
  }
  /* eslint-enable no-underscore-dangle */

  const store = createStore(createReducer(reducers), preloadedState,
    middleware);

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  sagas.forEach(sagaMiddleware.run);

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
