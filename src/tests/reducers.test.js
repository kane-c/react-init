import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import createReducer from 'reducers';

describe('Root reducer', () => {
  it('should provide an initial state', () => {
    const reducer = createReducer();

    const state = reducer(undefined, {});

    expect(state.toJS()).toEqual({
      routing: {
        locationBeforeTransitions: null,
      },
    });
  });

  it('should handle route changes', () => {
    const reducer = createReducer();

    let state = fromJS({
      routing: {
        locationBeforeTransitions: null,
      },
    });

    state = reducer(state, {
      payload: true,
      type: LOCATION_CHANGE,
    });

    expect(state.getIn(['routing', 'locationBeforeTransitions'])).toBe(true);
  });

  it('should merge additional reducers', () => {
    const reducer = createReducer({
      test: state => state.set('tested', true),
    });

    let state = fromJS({
      routing: {},
      test: {},
    });

    state = reducer(state, { type: 'test' });
    expect(state.getIn(['test', 'tested'])).toBe(true);
  });
});
