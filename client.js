import { render } from 'react-dom';
import { browserHistory } from 'react-router';

import App from './component/App';
import createReducer from './reducers';
import { routes } from './common';

const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const store = createStore(createReducer(), initialState);

const router = (
  <Router history={browserHistory}>
    {routes}
  </Router>
);

render(getRoot(store, router), document.getElementById('root'));
