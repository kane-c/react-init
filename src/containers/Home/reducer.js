import { fromJS } from 'immutable';

import { REPOS_LOADED } from './constants';

const initialState = fromJS({
  page: 'home',
  repos: [],
  username: 'kane-c',
});

/**
 * Home reducer.
 */
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case REPOS_LOADED:
      return state.set('repos', fromJS(action.repos));
    default:
      return state;
  }
}
