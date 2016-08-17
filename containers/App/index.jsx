import Helmet from 'react-helmet';
import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

/**
 * Main component that contains all other components.
 */
export default function App({ children }) {
  return (
    <div className="container">
      <Helmet titleTemplate="%s - My Title" />
      {children}
      <Link className={styles.test} to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};
