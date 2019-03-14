import { middlewares, injector, composeMiddlewares, createReduxStore } from './common.modules';

export function initializeStore(initialState) {
  const reduxMiddlewares = composeMiddlewares(...middlewares);
  const store = createReduxStore(initialState, reduxMiddlewares);
  injector();
  return store;
}

export default initializeStore;
