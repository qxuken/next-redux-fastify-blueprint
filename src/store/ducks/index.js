import * as system from 'store/ducks/system';

const ducks = [system];

function ducksToObject(acc, it) {
  return { ...acc, [it.storeName]: it.reducer };
}

export const reducers = ducks.reduce(ducksToObject, {});
export default reducers;
