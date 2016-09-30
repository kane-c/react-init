/**
 * Gets the repositories of the user from Github
 */
import { LOCATION_CHANGE } from 'react-router-redux';
import { delay } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';

import { repos } from './actions';
import { REPOS } from './constants';
import { selectUsername } from './selectors';

/**
 * Github repos request/response handler
 * @return {generator} Redux saga
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(selectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos`;

  yield delay(500);

  const result = {
    data: [username, 'b', 'c'],
  }; // yield call(request, requestURL);

  if (!result.err) {
    yield put(repos.success(result.data, result));
  } else {
    yield put(repos.failure(result.err));
  }
}

/**
 * Watch for the action and call the handler
 * @return {generator} Redux saga
 */
export function* getReposWatcher() {
  while (yield take(REPOS.REQUEST)) {
    yield call(getRepos);
  }
}

/**
 * Root saga manages watcher lifecycle
 * @return {generator} Redux saga
 */
export function* githubData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getReposWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  githubData,
];
