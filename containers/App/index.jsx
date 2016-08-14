import Helmet from 'react-helmet';
import React from 'react';
import { Link } from 'react-router';

/**
 * Main component that contains all other components.
 */
export default function App({ children }) {
  return (
    <div className="container">
      <Helmet titleTemplate="%s - My Title" />
      {children}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};
