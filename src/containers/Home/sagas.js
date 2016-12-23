/**
 * Gets the repositories of the user from Github
 */
import { delay, takeLatest } from 'redux-saga';
import { put, select, fork } from 'redux-saga/effects';

import { repos } from './actions';
import { REPOS } from './constants';
import { makeSelectUsername } from './selectors';

/**
 * Github repos request/response handler
 * @return {generator} Redux saga
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos`;

  try {
    yield delay(500);
    const result = {
      data: [username, 'b', 'c'],
    }; // yield call(request, requestURL);
    yield put(repos.success(result.data, result));
  } catch (err) {
    yield put(repos.failure(err));
  }
}

/**
 * Watch for the action and call the handler
 * @return {generator} Redux saga
 */
export function* getReposWatcher() {
  yield fork(takeLatest, REPOS.REQUEST, getRepos);
}

/**
 * Root saga manages watcher lifecycle
 * @return {generator} Redux saga
 */
export function* githubData() {
  // Fork watcher so we can continue execution
  yield fork(getReposWatcher);
}

export default [
  githubData,
];
