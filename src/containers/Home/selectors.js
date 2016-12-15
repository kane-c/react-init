import { createSelector } from 'reselect';

const selectHome = () => state => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome(),
  homeState => homeState.get('username'),
);

const makeSelectRepos = () => createSelector(
  selectHome(),
  homeState => homeState.get('repos'),
);

const makeSelectIsLoading = () => createSelector(
  selectHome(),
  homeState => homeState.get('isLoading'),
);

export {
  selectHome,
  makeSelectIsLoading,
  makeSelectUsername,
  makeSelectRepos,
};
