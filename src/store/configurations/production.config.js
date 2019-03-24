import {
  middlewares as commonMiddlewares,
  injector as commonInjector,
  composeMiddlewares,
  createReduxStore,
} from './common.modules';
import {
  middlewares as clientMiddlewares,
  injector as clientInjector,
} from './client.modules';

export function initializeStore(initialState) {
  const reduxMiddlewares = composeMiddlewares(
    ...commonMiddlewares,
    ...clientMiddlewares,
  );
  const store = createReduxStore(initialState, reduxMiddlewares);
  commonInjector();
  clientInjector();

  return store;
}

export default initializeStore;
