import React from 'react';
import { Provider } from 'react-redux';

import App from './containers/App';

export default function getRoot(store) {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
