import { fromJS } from 'immutable';

const initialState = fromJS({});

/**
 * App reducer.
 */
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
