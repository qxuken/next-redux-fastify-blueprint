import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from 'redux-folder/reducers';

export const middlewares = [thunkMiddleware];

export function injector() {
  return true;
}

export function composeMiddlewares() {
  return compose(applyMiddleware(...arguments));
}

export function createReduxStore(initialState, middlewares = []) {
  return createStore(reducers, initialState, middlewares);
}
