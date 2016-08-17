/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectUsername = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('username')
);

const selectRepos = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('repos')
);

export {
  selectHome,
  selectUsername,
  selectRepos,
};
