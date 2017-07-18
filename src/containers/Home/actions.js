import { action } from 'containers/App/actions';

import { REPOS } from './constants';

export const repos = { // eslint-disable-line import/prefer-default-export
  failure: error => action(REPOS.FAILURE, { error }),
  request: username => action(REPOS.REQUEST, { username }),
  // eslint-disable-next-line no-shadow
  success: repos => action(REPOS.SUCCESS, { repos }),
};
