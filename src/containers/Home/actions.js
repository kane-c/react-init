import { action } from 'containers/App/actions';

import { REPOS } from './constants';

export const repos = {
  request: (username) => action(REPOS.REQUEST, { username }),
  success: (repos) => action(REPOS.SUCCESS, { repos }),
  failure: (error) => action(REPOS.FAILURE, { error }),
};
