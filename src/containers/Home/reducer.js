// @flow
import { fromJS } from 'immutable';

import { REPOS } from './constants';

const initialState = fromJS({
  isLoading: false,
  repos: [],
  username: 'kane-c',
});

/**
 * Home reducer.
 * @param {Object} [state] Current or initial state
 * @param {Object} action Redux action
 * @return {Object} Updated state instance
 */
export default function homeReducer(state: Object = initialState,
  action: Object): Object {
  switch (action.type) {
    case REPOS.FAILURE:
      return state.set('error', action.payload.error)
        .set('isLoading', false);
    case REPOS.REQUEST:
      return state.set('isLoading', true);
    case REPOS.SUCCESS:
      return state.set('repos', fromJS(action.payload.repos))
        .set('isLoading', false);
    default:
      return state;
  }
}
