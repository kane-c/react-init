// @flow
import { action } from 'containers/App/actions';

import { REPOS } from './constants';

export const repos = { // eslint-disable-line import/prefer-default-export
  failure: (error: string): Object => action(REPOS.FAILURE, { error }),
  request: (username: string): Object => action(REPOS.REQUEST, { username }),
  success: (repos: string[]): Object => action(REPOS.SUCCESS, { repos }),
};
