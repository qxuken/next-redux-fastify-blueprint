// BLUEPRINT TO BUILD YOUR OWN DUCK
// reducer and actions are required to be exported

import api from 'services/api';
import {
  actionTemplate,
  xhrActionTemplate,
} from 'store/helpers/duckNamingTemplates';
import xhrOperation from 'store/helpers/xhrOperation';

// REDUX STORENAME
export const storeName = '_duckBlueptint';
export const storeFormName = '_duckBlueptintForm';

// ACTION CONFIGURATION
const ACTION = actionTemplate(storeName);

// REDUX TYPES
const INIT = ACTION('INIT');

const LOAD = xhrActionTemplate('LOAD');

const CHANGE_TAB = ACTION('CHANGE_TAB');
const SHOW_CREATE_FORM = ACTION('SHOW_CREATE_FORM');

// CONSTANTS
const TABS = [
  {
    name: 'Все',
    id: 'total',
    count: undefined,
    disabled: 'loading...',
  },
  {
    name: 'Мои',
    id: 'created_by_me',
    count: undefined,
    disabled: 'loading...',
  },
];

const initialState = {
  tabs: {
    items: TABS,
    current: TABS[0].id,
  },
  items: [],
  loading: 0,
};

// REDUCER
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
      };
    case LOAD.REQ:
      return {
        ...state,
        loading: state.loading + 1,
      };
    case LOAD.RES:
      return loadResp(...arguments);
    case LOAD.FAIL:
      return {
        ...state,
        loading: state.loading - 1,
      };
    default:
      return state;
  }
}

// REDUX ACTIONS
export const actions = {
  // initiate topics on page load
  init: () => async dispatch => {
    await dispatch({ type: INIT });
    dispatch(actions.load());
  },
  // load actions
  load: xhrOperation(LOAD, api.something.all),
  // specific actions
  changeTab: ({ id }) => ({ type: CHANGE_TAB, payload: { id } }),
  // form events
  // some logic here
  submitForm: async values => ({ someData: 'onComplete', values }),
  // show something
  showCreateForm: () => ({ type: SHOW_CREATE_FORM }),
};

// SUPPORT FUNCTIONS
function loadResp(state, { payload }) {
  return {
    ...state,
    items: payload,
    loading: state.loading - 1,
  };
}
