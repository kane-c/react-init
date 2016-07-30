import { render } from 'react-dom'
import createReducer from './reducers'

const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const store = createStore(createReducer(), initialState);

render(getRoot(store), document.getElementById('root'));
