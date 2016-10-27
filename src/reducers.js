// @flow
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const routingInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state.
 * Required to use React Router Redux with Immutable.
 * @param {Object} [state] Immutable map instance
 * @param {Object} action Redux action
 * @return {Object} new state
 */
function routingReducer(state?: Object = routingInitialState,
  action: Object): Object {
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
 * @param {Object} [asyncReducers] Additional reducers
 * @return {function} Combined reducers
 */
export default function createReducer(asyncReducers?: Object): Function {
  return combineReducers({
    routing: routingReducer,
    ...asyncReducers,
  });
}
