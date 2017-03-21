import Helmet from 'react-helmet';
import React from 'react';
import { Grid } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';

import NotFound from 'components/NotFound';

import routes from 'routes';

import styles from './styles.css';

/**
 * Main component that contains all other components.
 * @return {Object} React node
 */
export default function App() {
  return (
    <Grid>
      <Helmet titleTemplate="%s - My Title" />
      <Switch>
        {routes.map(route => <Route key={route.path} {...route} />)}
        <Route component={NotFound} />
      </Switch>
      <Link className={styles.test} to="/">Home</Link>
      <Link to="/about">About</Link>
    </Grid>
  );
}
