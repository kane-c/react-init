import { expect } from 'chai';
import { fromJS } from 'immutable';

import * as selectors from 'containers/Home/selectors';

describe('Home page selectors', () => {
  const state = fromJS({
    home: {
      isLoading: true,
      repos: [1, 2, 3],
      username: 'test',
    },
  });

  const tests = [
    [selectors.selectRepos, [1, 2, 3]],
    [selectors.selectUsername, 'test'],
    [selectors.selectIsLoading, true],
  ];

  tests.forEach((test) => {
    const [selector, expected] = test;
    let actual = selector()(state);

    // Convert from Immutable object if required
    if (actual.toJS) {
      actual = actual.toJS();
    }

    expect(actual).to.deep.equal(expected);
  });
});
