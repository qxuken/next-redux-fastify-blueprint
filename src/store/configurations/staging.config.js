import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
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
  const logger = createLogger({ collapsed: true, duration: true, diff: true });
  const reduxMiddlewares = composeWithDevTools(
    composeMiddlewares(...commonMiddlewares, ...clientMiddlewares, logger),
  );
  const store = createReduxStore(initialState, reduxMiddlewares);
  commonInjector();
  clientInjector();

  return store;
}

export default initializeStore;
