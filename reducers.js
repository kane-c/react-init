import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from './containers/App/reducer';

const routingInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state.
 * Required to use React Router Redux with Immutable.
 */
function routingReducer(state = routingInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Root reducer function.
 */
export default function createReducer() {
  return combineReducers({
    routing: routingReducer,
    global: globalReducer,
  });
}
