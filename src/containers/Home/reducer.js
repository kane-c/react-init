import { fromJS } from 'immutable';

import { REPOS } from './constants';

const initialState = fromJS({
  page: 'home',
  repos: [],
  username: 'kane-c',
});

/**
 * Home reducer.
 * @param {Object} [state] Current or initial state
 * @param {Object} action Redux action
 * @return {Object} Updated state instance
 */
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case REPOS.SUCCESS:
      return state.set('repos', fromJS(action.repos));
    default:
      return state;
  }
}
