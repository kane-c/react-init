import { LOAD_REPOS, REPOS_LOADED } from './constants';

/**
 * Load repos.
 */
export function loadRepos(username) {
  return {
    type: LOAD_REPOS,
    username,
  };
}

/**
 * Repos are loaded.
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
 */
export function repoLoadingError() {
  return {
    type: '',
  };
}
