import Console from 'services/Console';
import { actionTemplate } from 'store/helpers/duckNamingTemplates';

// REDUX STORENAME
export const storeName = 'system';

// ACTION CONFIGURATION
const ACTION = actionTemplate(storeName);

// REDUX TYPES
const SERVER_INIT = ACTION('SERVER_INIT');
const CLIENT_INIT = ACTION('CLIENT_INIT');

// CONSTANTS
const initialState = {
  isServer: true,
};

// REDUCER
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SERVER_INIT:
      return {
        ...initialState,
        isServer: true,
      };
    case CLIENT_INIT:
      return {
        ...initialState,
        isServer: false,
      };
    default:
      return state;
  }
}

// ACTIONS
export const actions = {
  sendInitFromServer: () => async (dispatch, gState) => {
    if (gState()[storeName].isServer) {
      await dispatch({ type: SERVER_INIT });
    }
    return true;
  },
  sendInitFromClient: () => async dispatch => {
    Console.greeting();
    await dispatch({ type: CLIENT_INIT });
    window.gCss.setVariable('loaderDisplay', 'none');
    return true;
  },
};
