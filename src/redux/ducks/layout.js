import { isUndefined } from 'lodash';
import { Dashboard, Extension, Build } from '@material-ui/icons';
import { actionTemplate } from './constants';

// REDUX STORENAME
export const storeName = 'layout';

// ACTION CONFIGURATION
const ACTION = actionTemplate(storeName);

// REDUX TYPES
const INIT_LAYOUT = ACTION('INIT_LAYOUT');

const SET_MINI = ACTION('SET_MINI');
const SET_MOBILE = ACTION('SET_MOBILE');

// CONSTANTS

export const ROUTES = [
  {
    path: '/',
    name: 'Dashboard',
    icon: Dashboard,
  },
  {
    path: '/admin',
    name: 'Admin panel',
    icon: Extension,
    userRole: 'admin',
  },
  {
    path: '/forms',
    name: 'Form builder',
    icon: Build,
  },
  {
    path: '/customer',
    name: 'Customer',
    icon: Build,
  },
];

const initialState = {
  mobileOpen: false,
  miniActive: false,
  image: '/static/images/sidebar-2.jpg',
  color: 'purple',
  bgColor: 'black',
  hasImage: true,
  fixedClasses: 'dropdown',
};

// REDUCER
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT_LAYOUT:
      return {
        ...initialState,
        ...action.payload,
      };
    case SET_MINI:
      return {
        ...state,
        miniActive: action.payload,
      };
    case SET_MOBILE:
      return {
        ...state,
        mobileOpen: action.payload,
      };
    default:
      return state;
  }
}

// ACTIONS
export const actions = {
  initLayout: () => async (dispatch, gState) => {
    const savedValues = {
      miniActive: localStorage.getItem('miniActive') === 'true' ? true : initialState.miniActive,
    };
    await dispatch({ type: INIT_LAYOUT, payload: savedValues });
    return true;
  },
  toggleMini: forceSet => async (dispatch, gState) => {
    const { miniActive } = gState()[storeName];
    const newValue = isUndefined(forceSet) ? !miniActive : forceSet;
    await dispatch({ type: SET_MINI, payload: newValue });
    localStorage.setItem('miniActive', newValue);
    return true;
  },
  toggleMobile: forceSet => async (dispatch, gState) => {
    const { mobileOpen } = gState()[storeName];
    const newValue = isUndefined(forceSet) ? !mobileOpen : forceSet;
    await dispatch({ type: SET_MOBILE, payload: newValue });
    return true;
  },
};
