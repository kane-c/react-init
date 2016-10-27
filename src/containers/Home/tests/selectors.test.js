// @flow
import { fromJS } from 'immutable';

import * as selectors from 'containers/Home/selectors';

describe('Home page selectors', () => {
  it('should select the correct data', () => {
    const state = fromJS({
      home: {
        isLoading: true,
        repos: [1, 2, 3],
        username: 'test',
      },
    });

    const tests = [
      [selectors.makeSelectRepos, [1, 2, 3]],
      [selectors.makeSelectUsername, 'test'],
      [selectors.makeSelectIsLoading, true],
    ];

    tests.forEach((test) => {
      const [selector, expected] = test;
      let actual = selector()(state);

      // Convert from Immutable object if required
      if (actual.toJS) {
        actual = actual.toJS();
      }

      expect(actual).toEqual(expected);
    });
  });
});
