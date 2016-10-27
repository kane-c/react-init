// @flow
import { createSelector } from 'reselect';

const selectHome = (): Function => (state: Object): Object => (
  state.get('home')
);

const makeSelectUsername = (): Function => createSelector(
  selectHome(),
  (homeState: Object): string => homeState.get('username'),
);

const makeSelectRepos = (): Function => createSelector(
  selectHome(),
  (homeState: Object): string[] => homeState.get('repos'),
);

const makeSelectIsLoading = (): Function => createSelector(
  selectHome(),
  (homeState: Object): Boolean => homeState.get('isLoading'),
);

export {
  selectHome,
  makeSelectIsLoading,
  makeSelectUsername,
  makeSelectRepos,
};
