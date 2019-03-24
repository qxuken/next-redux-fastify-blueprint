import { createLogger } from 'redux-logger';
import {
  middlewares,
  injector,
  composeMiddlewares,
  createReduxStore,
} from './common.modules';

export function initializeStore(initialState) {
  const logger = createLogger({
    collapsed: true,
    duration: true,
    diff: true,
    stateTransformer: function() {
      return { filtered: true };
    },
  });
  const reduxMiddlewares = composeMiddlewares(...middlewares, logger);
  const store = createReduxStore(initialState, reduxMiddlewares);
  injector();
  return store;
}

export default initializeStore;
