import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducer';

import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, reducer)

// ==============================|| REDUX - MAIN STORE ||============================== //

//const store = createStore(reducer, composeEnhancers(applyMiddleware()));
//const persister = 'CHATAI';

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
  })
  
const persister = persistStore(store)

export { store, persister };
