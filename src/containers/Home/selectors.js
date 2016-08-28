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

const selectIsLoading = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('isLoading')
);

export {
  selectHome,
  selectIsLoading,
  selectUsername,
  selectRepos,
};
