import { set, compact } from 'lodash';
import * as system from 'redux-folder/ducks/system';
import * as layout from 'redux-folder/ducks/layout';

const ducks = [system, layout];

function ducksToObject(acc, it) {
  return { ...acc, [it.storeName]: it.reducer };
}

export const reducers = ducks.reduce(ducksToObject, {});
