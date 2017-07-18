import { fromJS } from 'immutable';

import { repos } from 'containers/Home/actions';
import reducer from 'containers/Home/reducer';

/**
 * Shortcut to execute a reducer and assert the updated state.
 * Converts to/from Immutable.
 * @param {Object} action Action type and payload.
 * @param {Object} expectedState The state to test for.
 * @param {Object} [initialState] Optional initial state object.
 * @return {void}
 */
function testReducer(action, expectedState, initialState = {}) {
  const actual = reducer(fromJS(initialState), action).toJS();

  expect(actual).toEqual(expectedState);
}

describe('Home reducer', () => {
  it('should ignore unknown actions', () => {
    const state = { test: true };
    testReducer({ type: 'SOMETHING_ELSE' }, state, state);
  });

  it('should handle repo failure', () => {
    testReducer(repos.failure('error'), {
      error: 'error',
      isLoading: false,
    });
  });

  it('should handle repo request', () => {
    testReducer(repos.request('user'), {
      isLoading: true,
    });
  });

  it('should handle repo success', () => {
    testReducer(repos.success(['a', 'b', 'c']), {
      repos: ['a', 'b', 'c'],
      isLoading: false,
    });
  });
});
