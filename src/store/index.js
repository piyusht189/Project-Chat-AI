import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(reducer, composeEnhancers(applyMiddleware()));
const persister = 'CHATAI';

export { store, persister };
