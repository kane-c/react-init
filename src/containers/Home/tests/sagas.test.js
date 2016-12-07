import { expect } from 'chai';
import { LOCATION_CHANGE } from 'react-router-redux';
import { delay } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';

// import { repos } from 'containers/Home/actions';
import { REPOS } from 'containers/Home/constants';
import { selectUsername } from 'containers/Home/selectors';
import { getRepos, getReposWatcher, githubData } from 'containers/Home/sagas';

const username = 'test';

/**
 * Modify a saga call to be testable.
 * It is difficult to correctly deep compare these because they include
 * functions in their values.
 * @param {Object} descriptor Redux Saga descriptor
 * @return {Object} Modified descriptor
 */
function testableSaga(descriptor) {
  /* eslint-disable no-param-reassign */
  if (descriptor.SELECT && descriptor.SELECT.selector) {
    descriptor.SELECT.selector = {};
  } else if (descriptor['@@redux-saga/cancelPromise']) {
    descriptor['@@redux-saga/cancelPromise'] = {};
  }
  /* eslint-enable no-param-reassign */

  return descriptor;
}

describe('getRepos Saga', () => {
  let getReposGenerator;

  // We have to test twice, once for a successful load and once for an
  // unsuccessful one so we do all the stuff that happens beforehand
  // automatically in the beforeEach
  beforeEach(() => {
    getReposGenerator = getRepos();

    const selectDescriptor = getReposGenerator.next().value;
    expect(testableSaga(selectDescriptor)).to.deep.equal(
      testableSaga(select(selectUsername())),
    );

    const callDescriptor = getReposGenerator.next(username).value;
    // const requestURL = `https://api.github.com/users/${username}/repos`;
    // expect(callDescriptor).to.deep.equal(call(request, requestURL));
    expect(testableSaga(callDescriptor)).to.deep.equal(
      testableSaga(delay(500)),
    );
  });

  /*
  TODO reinstate these tests when using a real Ajax call
  it('should dispatch repos.success if the request succeeds', () => {
    const response = {
      data: [
        'First repo',
        'Second repo',
      ],
    };
    const putDescriptor = getReposGenerator.next(response).value;
    const expected = put(repos.success(response.data, username));
    expect(putDescriptor).to.deep.equal(expected);
  });

  it('should call the failure action if the response errors', () => {
    const response = {
      err: 'Some error',
    };
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(put(repos.failure(response.err)));
  });
  */
});

describe('getReposWatcher Saga', () => {
  const getReposWatcherGenerator = getReposWatcher();

  it('should watch for LOAD_REPOS action', () => {
    const takeDescriptor = getReposWatcherGenerator.next().value;
    expect(takeDescriptor).to.deep.equal(take(REPOS.REQUEST));
  });

  it('should invoke getRepos saga on actions', () => {
    const callDescriptor = getReposWatcherGenerator.next(
      put(REPOS.REQUEST),
    ).value;
    expect(callDescriptor).to.deep.equal(call(getRepos));
  });
});

describe('githubDataSaga saga', () => {
  const githubDataSaga = githubData();

  let forkDescriptor;

  it('should asyncronously fork getReposWatcher saga', () => {
    forkDescriptor = githubDataSaga.next();
    expect(forkDescriptor.value).to.deep.equal(fork(getReposWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = githubDataSaga.next();
    expect(takeDescriptor.value).to.deep.equal(take(LOCATION_CHANGE));
  });

  it('should finally cancel() the forked getReposWatcher saga',
    function* githubDataSagaCancellable() { // eslint-disable-line
      // reuse open fork for more integrated approach
      forkDescriptor = githubDataSaga.next(put(LOCATION_CHANGE));
      expect(forkDescriptor.value).to.deep.equal(cancel(forkDescriptor));
    },
  );
});
