import React from 'react';
import { shallow } from 'enzyme';
import { END } from 'redux-saga';

import {
  getRoot,
  getStore,
} from '../common';

const noOp = () => {};

describe('getRoot()', () => {
  it('should return a React component containing the router', () => {
    const router = <p>Router</p>;
    const store = {
      // Mock Redux store
      dispatch: noOp,
      getState: noOp,
      subscribe: noOp,
    };

    const root = shallow(getRoot(store, router));

    expect(root.getNode()).toBe(router);
  });
});

describe('getStore()', () => {
  it('should add saga properties to the store', () => {
    const store = getStore();

    expect(store).toHaveProperty('runSaga');
    expect(store).toHaveProperty('close');
  });

  it('should dispatch saga END', () => {
    const store = getStore();

    store.dispatch = jest.fn();
    store.close();

    expect(store.dispatch.mock.calls).toEqual([[END]]);
  });

  it('should return a Redux store', () => {
    const store = getStore(undefined, x => () => x);

    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('getState');
    expect(store).toHaveProperty('subscribe');
  });
});
