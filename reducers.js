import { combineReducers } from 'redux';

import globalReducer from './containers/App/reducer';

export default function createReducer() {
  return combineReducers({
    global: globalReducer,
  });
}
