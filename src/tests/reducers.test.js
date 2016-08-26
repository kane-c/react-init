import { expect } from 'chai';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import createReducer from 'reducers';

describe('Root reducer', () => {
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

    expect(state).to.have.deep.property([
      'routing',
      'locationBeforeTransitions',
    ], true);
  });

  it('should merge additional reducers', () => {
    const reducer = createReducer({
      test: (state) => state.set('tested', true),
    });

    let state = fromJS({
      routing: {},
      test: {},
    });

    state = reducer(state, { type: 'test' });
    expect(state).to.have.deep.property(['test', 'tested'], true);
  });
});
