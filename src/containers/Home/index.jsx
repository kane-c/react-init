import Helmet from 'react-helmet';
import Icon from 'react-fontawesome';
import React from 'react';
import {
  ControlLabel,
  FormControl,
  FormGroup,
  InputGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { createStructuredSelector } from 'reselect';

import LoadingIndicator from 'components/LoadingIndicator';

import { repos } from './actions';
import { selectIsLoading, selectRepos } from './selectors';
import { githubData } from './sagas';

/**
 * Home page component.
 */
export class Home extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  static propTypes = {
    isLoading: React.PropTypes.bool,
    onSubmit: React.PropTypes.func,
    repos: React.PropTypes.instanceOf(List).isRequired,
  };

  static preloadSagas = [
    githubData,
  ];

  /**
   * Dispatch the initial data fetch.
   * @return {void}
   */
  componentWillMount() {
    // Don't re-request if we already have the data (i.e. preloaded by server)
    if (!this.props.repos.size) {
      this.props.onSubmit();
    }
  }

  /**
   * Render the repo list.
   * @return {Object} React node
   */
  render() {
    const result = this.props.isLoading ? <LoadingIndicator /> : (
      <ul>
        {this.props.repos.map((repo, i) => <li key={i}>{repo}</li>)}
      </ul>
    );

    const { Addon } = InputGroup;

    return (
      <form onSubmit={this.props.onSubmit}>
        <Helmet title="Home" />
        <h1>Home</h1>
        <FormGroup controlId="username">
          <ControlLabel>Username</ControlLabel>
          <InputGroup>
            <Addon>
              <Icon fixedWidth name="user" />
            </Addon>
            <FormControl name="username" type="text" />
          </InputGroup>
        </FormGroup>
        {result}
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading(),
  repos: selectRepos(),
});

/**
 * Dispatch the load repos action on submit.
 * @param {function} dispatch Redux store dispatch function
 * @return {Object} Map of props
 */
function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (evt) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }

      dispatch(repos.request());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
