const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

/**
 * Create an action object for async actions.
 * @param {String} base Action prefix
 * @return {Object} Action object with REQUEST/SUCCESS/FAILURE properties
 */
export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((actions, type) => {
    actions[type] = `${base}_${type}`; // eslint-disable-line no-param-reassign
    return actions;
  }, {});
}

/**
 * Basic action creator.
 * @param {String} type Action type
 * @param {Object} payload Additional data
 * @return {Object} Redux action
 */
export function action(type, payload) {
  return {
    payload,
    type,
  };
}
