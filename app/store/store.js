import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from '../reducers/rootReducer.js';

export default function configureStore(initialState = {}) {
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk)
    )
  );
  return store
}
