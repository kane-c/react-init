/**
 * Gets the repositories of the user from Github
 */
import { delay } from 'redux-saga';
import { put, select, takeLatest } from 'redux-saga/effects';

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
 * Root saga manages watcher lifecycle
 * @return {generator} Redux saga
 */
export function* githubData() {
  yield takeLatest(REPOS.REQUEST, getRepos);
}

export default [
  githubData,
];
