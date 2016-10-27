// @flow
import { takeLatest } from 'redux-saga/effects';

// import { repos } from '../actions';
import { REPOS } from '../constants';
import { getRepos, githubData } from '../sagas';

const username = 'test';

describe('getRepos Saga', () => {
  let getReposGenerator;

  // We have to test twice, once for a successful load and once for an
  // unsuccessful one so we do all the stuff that happens beforehand
  // automatically in the beforeEach
  beforeEach(() => {
    getReposGenerator = getRepos();

    const selectDescriptor = getReposGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getReposGenerator.next(username).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  /*
  TODO reinstate these tests when using a real Ajax call
  it('should dispatch repos.success action the request succeeds', () => {
    const response = {
      data: [username, 'b', 'c'],
    };
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(repos.success(response.data, response)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getReposGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(repos.failure(response)));
  });
  */
});

describe('githubDataSaga saga', () => {
  const githubDataSaga = githubData();

  it('should start task to watch for `REPOS.REQUEST` action', () => {
    const takeLatestDescriptor = githubDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(REPOS.REQUEST, getRepos));
  });
});
