import { LOAD_REPOS, REPOS_LOADED } from './constants';

/**
 * Load repos.
 * @param {string} username Username to fetch
 * @return {Object} Redux action
 */
export function loadRepos(username) {
  return {
    type: LOAD_REPOS,
    username,
  };
}

/**
 * Repos are loaded.
 * @return {Object} Redux action
 */
export function reposLoaded() {
  return {
    type: REPOS_LOADED,
    repos: [
      'a', 'b', 'c',
    ],
  };
}

/**
 * Error loading repos.
 * @return {Object} Redux action
 */
export function repoLoadingError() {
  return {
    type: '',
  };
}
