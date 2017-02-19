import Helmet from 'react-helmet';
import React from 'react';
import { Grid } from 'react-bootstrap';
import { Link } from 'react-router';

import styles from './styles.css';

/**
 * Main component that contains all other components.
 * @param {Object} props React props
 * @return {Object} React node
 */
export default function App({ children }) {
  return (
    <Grid>
      <Helmet titleTemplate="%s - My Title" />
      {children}
      <Link className={styles.test} to="/">Home</Link>
      <Link to="/about">About</Link>
    </Grid>
  );
}

App.propTypes = {
  children: React.PropTypes.node.isRequired,
};
