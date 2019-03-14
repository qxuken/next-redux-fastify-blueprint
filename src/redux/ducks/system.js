import { actionTemplate } from './constants';
import { actions as authorizationActions } from './authorization';
import { actions as layoutActions } from './layout';

// REDUX STORENAME
export const storeName = 'system';

// ACTION CONFIGURATION
const ACTION = actionTemplate(storeName);

// REDUX TYPES
const SERVER_INIT = ACTION('SERVER_INIT');
const CLIENT_INIT = ACTION('CLIENT_INIT');

// CONSTANTS
const initialState = {
  server: false,
};

// REDUCER
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SERVER_INIT:
      return {
        ...initialState,
        server: true,
      };
    case CLIENT_INIT:
      return {
        ...initialState,
        server: false,
      };
    default:
      return state;
  }
}

// ACTIONS
export const actions = {
  sendInitFromServer: () => ({ type: SERVER_INIT }),
  sendInitFromClient: () => async (dispatch, gState) => {
    await dispatch({ type: CLIENT_INIT });
    await dispatch(authorizationActions.renewAuthorization());
    await dispatch(layoutActions.initLayout());
    window.gCss.setVariable('loaderDisplay', 'none');
    return true;
  },
};
