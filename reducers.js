import { combineReducers } from 'redux';

import globalReducer from './containers/App/reducer';

/**
 * Root reducer function.
 */
export default function createReducer() {
  return combineReducers({
    global: globalReducer,
  });
}
