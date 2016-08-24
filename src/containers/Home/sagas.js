/**
 * Gets the repositories of the user from Github
 */
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { reposLoaded, repoLoadingError } from './actions';
import { LOAD_REPOS } from './constants';
import { selectUsername } from './selectors';

/**
 * Github repos request/response handler
 * @return {generator} Redux saga
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(selectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos`;

  const repos = {
    data: username,
  }; // yield call(request, requestURL);

  if (!repos.err) {
    yield put(reposLoaded(repos.data, username));
  } else {
    yield put(repoLoadingError(repos.err));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 * @return {generator} Redux saga
 */
export function* getReposWatcher() {
  while (yield take(LOAD_REPOS)) {
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
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  githubData,
];
