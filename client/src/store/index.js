import { createStore, applyMiddleware, compose } from 'redux';

import middleware from './middleware'
import reducer from '../reducers'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);

const configureStore = initialState => (
    createStore(
        reducer,
        initialState,
        enhancer,
    )
)

export default configureStore()
