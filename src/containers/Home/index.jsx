import Helmet from 'react-helmet';
import Icon from 'react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { createStructuredSelector } from 'reselect';

import { repos } from './actions';
import { selectRepos } from './selectors';
import { githubData } from './sagas';

/**
 * Home page component.
 */
export class Home extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  static propTypes = {
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
    this.props.onSubmit();
  }

  /**
   * Render the repo list.
   * @return {Object} React node
   */
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <Helmet title="Home" />
        <h1>Home</h1>
        <Icon name="home" />&nbsp;
        <input name="username" />
        <ul>
          {this.props.repos.map((repo, i) => <li key={i}>{repo}</li>)}
        </ul>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
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
