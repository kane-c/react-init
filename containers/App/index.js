import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        {this.props.children}

        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
    );
  }
}

export default App;
