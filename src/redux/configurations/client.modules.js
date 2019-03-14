import { set } from 'lodash';
import reduxCSS from 'redux-css';

import styleReducer from 'redux-folder/reducers/styleReducer';

const { middleware: cssMiddleware, ...css } = reduxCSS(styleReducer);

export const middlewares = [cssMiddleware];

export function injector() {
  return set(window, 'gCss', css);
}
