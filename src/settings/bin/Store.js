import { createStore, applyMiddleware } from 'redux'
// import { configureStore as createStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from 'seed/reducers/combiner'

const logger = createLogger();

export default function configureStore(preloadedState) {
  const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(thunk, logger)
  );

  return store;
}