import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from "redux-logger";
import { reducer } from '../reducers/rootReducer.js';

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk, loggerMiddleware)
    )
  );
  return store
}
