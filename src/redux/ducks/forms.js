import Router from 'next/router';
import uuid from 'uuid/v4';
import { sortBy, take, takeRight, slice, partition, throttle, isNumber, isUndefined } from 'lodash';
import { initialize, change, destroy } from 'redux-form';
import { actionTemplate, xhrActionTemplate } from 'redux-folder/ducks/constants';
import { actions as notificationsActions } from 'redux-folder/ducks/notifications';

import api from 'services-folder/api';

// REDUX STORENAME
export const storeName = 'clientForms';
export const storeFormName = 'clientForm';

// ACTION CONFIGURATION
const ACTION = actionTemplate(storeName);
const XHR_ACTION = xhrActionTemplate(ACTION);

// REDUX TYPES
const INIT_FORM_CREATOR = ACTION('INIT_FORM_CREATOR');

const LOAD_FORMS = XHR_ACTION('LOAD_FORMS');
const LOAD_FORM = XHR_ACTION('LOAD_FORM');
const CREATE_FORM = XHR_ACTION('CREATE_FORM');
const UPDATE_FORM = XHR_ACTION('UPDATE_FORM');
const LOAD_FIELD_TEMPLATES = XHR_ACTION('LOAD_FIELD_TEMPLATES');

const TOGGLE_FIELD_SELECTOION_MODAL = ACTION('TOGGLE_FIELD_SELECTOION_MODAL');
const SEARCH = ACTION('SEARCH');
const MODAl_SEARCH = ACTION('MODAl_SEARCH');

const SET_ITEM_FUTURE_POSITION = ACTION('SET_ITEM_FUTURE_POSITION');
const SET_ITEM_FUTURE_PARENT = ACTION('SET_ITEM_FUTURE_PARENT');
const ITEM_DROPPED = ACTION('ITEM_DROPPED');

// CONSTANTS
export const BUILDER_TYPES = {
  FORM_SCREEN: {
    formField: 'form_screens',
    dependentModel: 'FORM_GROUP',
    new: data => ({
      name: 'New Screen',
      rawId: uuid(),
      ...data,
    }),
  },
  FORM_GROUP: {
    formField: 'form_groups',
    ownerModelReference: 'form_screen_id',
    dependentModel: 'FORM_FIELD',
    new: data => ({
      name: 'New Group',
      rawId: uuid(),
      ...data,
    }),
  },
  FORM_FIELD: {
    formField: 'form_fields',
    ownerModelReference: 'form_group_id',
    new: data => ({
      ...data,
    }),
  },
};

const initialState = {
  items: [],
  item: {},
  fieldTemplates: [],
  loading: 0,
  searchText: '',
  modalSearchText: '',
  fieldSelectionModalOpen: false,
  fieldSelectionModalGroup: {},
  itemFuturePosition: undefined,
  itemFutureParentId: undefined,
};

// REDUCER
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT_FORM_CREATOR:
      return initialState;
    case LOAD_FORMS.REQ:
    case LOAD_FORM.REQ:
    case LOAD_FIELD_TEMPLATES.REQ:
      return {
        ...state,
        loading: state.loading + 1,
      };
    case LOAD_FORMS.RES:
      return {
        ...state,
        loading: state.loading - 1,
        items: action.payload,
      };
    case LOAD_FORM.RES:
      return {
        ...state,
        loading: state.loading - 1,
        item: action.payload,
      };
    case LOAD_FIELD_TEMPLATES.RES:
      return {
        ...state,
        loading: state.loading - 1,
        fieldTemplates: action.payload,
      };
    case LOAD_FORMS.FAIL:
    case LOAD_FORM.FAIL:
    case LOAD_FIELD_TEMPLATES.FAIL:
      return {
        ...state,
        loading: state.loading - 1,
      };
    case SEARCH:
      return {
        ...state,
        searchText: action.payload,
      };
    case MODAl_SEARCH:
      return {
        ...state,
        modalSearchText: action.payload,
      };
    case TOGGLE_FIELD_SELECTOION_MODAL:
      return {
        ...state,
        fieldSelectionModalOpen: !state.fieldSelectionModalOpen,
        fieldSelectionModalGroup: action.payload || initialState.fieldSelectionModalGroup,
        modalSearchText: initialState.modalSearchText,
      };
    case SET_ITEM_FUTURE_POSITION:
      return {
        ...state,
        itemFuturePosition: action.payload,
      };
    case SET_ITEM_FUTURE_PARENT:
      return {
        ...state,
        itemFutureParentId: action.payload,
      };
    case ITEM_DROPPED:
      return {
        ...state,
        itemFuturePosition: initialState.itemFuturePosition,
        itemFutureParentId: initialState.itemFutureParentId,
      };
    default:
      return state;
  }
}

// REDUX ACTIONS
export const actions = {
  initFormCreator: () => async dispatch => {
    await dispatch({ type: INIT_FORM_CREATOR });
    dispatch(destroy(storeFormName));
    dispatch(actions.loadFieldTemplates());
    if (Router.query.id) {
      const form = await dispatch(actions.loadForm(Router.query));
      dispatch(initialize(storeFormName, formInitializerPresenter(form)));
    } else {
      dispatch(
        initialize(storeFormName, {
          name: '',
          global: false,
          enabled: false,
          form_screens: [],
          form_groups: [],
          form_fields: [],
        }),
      );
    }
  },
  // load actions
  loadForms: () => async dispatch => {
    await dispatch({ type: LOAD_FORMS.REQ });
    try {
      const res = await api.clientForms.fetchAll();
      await dispatch({ type: LOAD_FORMS.RES, payload: res.data.data });
      return res.data.data;
    } catch (e) {
      await dispatch(
        notificationsActions.enqueueSnackbar({
          message: 'Server error.',
          options: {
            variant: 'error',
          },
        }),
      );
      await dispatch({ type: LOAD_FORMS.FAIL, payload: e });
      return false;
    }
  },
  loadForm: ({ id }) => async dispatch => {
    await dispatch({ type: LOAD_FORM.REQ });
    try {
      const res = await api.clientForms.show({ id });
      await dispatch({ type: LOAD_FORM.RES, payload: res.data.data });
      return res.data.data;
    } catch (e) {
      await dispatch(
        notificationsActions.enqueueSnackbar({
          message: 'Server error.',
          options: {
            variant: 'error',
          },
        }),
      );
      await dispatch({ type: LOAD_FORM.FAIL, payload: e });
      return false;
    }
  },
  loadForm: ({ id }) => async dispatch => {
    await dispatch({ type: LOAD_FORM.REQ });
    try {
      const res = await api.clientForms.show({ id });
      await dispatch({ type: LOAD_FORM.RES, payload: res.data.data });
      return res.data.data;
    } catch (e) {
      await dispatch(
        notificationsActions.enqueueSnackbar({
          message: 'Server error.',
          options: {
            variant: 'error',
          },
        }),
      );
      await dispatch({ type: LOAD_FORM.FAIL, payload: e });
      return false;
    }
  },
  createForm: item => async dispatch => {
    await dispatch({ type: CREATE_FORM.REQ });
    try {
      const res = await api.clientForms.create(item);
      await dispatch({ type: CREATE_FORM.RES, payload: res.data.data });
      return res.data.data;
    } catch (e) {
      await dispatch(
        notificationsActions.enqueueSnackbar({
          message: 'Server error.',
          options: {
            variant: 'error',
          },
        }),
      );
      await dispatch({ type: CREATE_FORM.FAIL, payload: e });
      return false;
    }
  },
  updateForm: item => async dispatch => {
    await dispatch({ type: UPDATE_FORM.REQ });
    try {
      const res = await api.clientForms.update(item);
      await dispatch({ type: UPDATE_FORM.RES, payload: res.data.data });
      return res.data.data;
    } catch (e) {
      await dispatch(
        notificationsActions.enqueueSnackbar({
          message: 'Server error.',
          options: {
            variant: 'error',
          },
        }),
      );
      await dispatch({ type: UPDATE_FORM.FAIL, payload: e });
      return false;
    }
  },
  loadFieldTemplates: () => async dispatch => {
    await dispatch({ type: LOAD_FIELD_TEMPLATES.REQ });
    try {
      const res = await api.clientForms.getFieldTemplates();
      await dispatch({ type: LOAD_FIELD_TEMPLATES.RES, payload: res.data.data });
      return res.data.data;
    } catch (e) {
      await dispatch(
        notificationsActions.enqueueSnackbar({
          message: 'Server error.',
          options: {
            variant: 'error',
          },
        }),
      );
      await dispatch({ type: LOAD_FIELD_TEMPLATES.FAIL, payload: e });
      return false;
    }
  },
  submitBuilderForm: async (values, dispatch) => {
    const formatedData = {
      id: values.id,
      name: values.name,
      global: values.global,
      enabled: values.enabled,
      form_screens_attributes: values[BUILDER_TYPES.FORM_SCREEN.formField].map(it => {
        const elId = it.id || it.rawId;
        return {
          id: it.id,
          name: it.name,
          position: it.position,
          _destroy: it._destroy,
          form_groups_attributes: values[BUILDER_TYPES.FORM_GROUP.formField]
            .filter(it => it[BUILDER_TYPES.FORM_GROUP.ownerModelReference] === elId)
            .map(it => {
              const elId = it.id || it.rawId;
              return {
                id: it.id,
                name: it.name,
                position: it.position,
                _destroy: it._destroy,
                form_fields_attributes: values[BUILDER_TYPES.FORM_FIELD.formField]
                  .filter(it => it[BUILDER_TYPES.FORM_FIELD.ownerModelReference] === elId)
                  .map(it => ({
                    id: it.id,
                    field_template_id: it.field_template_id,
                    position: it.position,
                    _destroy: it._destroy,
                  })),
              };
            }),
        };
      }),
    };
    let res = false;
    if (formatedData.id) {
      res = await dispatch(actions.updateForm(formatedData));
      if (res) {
        setTimeout(() => {
          dispatch(actions.initFormCreator());
        }, 1500);
      }
    } else {
      res = await dispatch(actions.createForm(formatedData));
      if (res) {
        setTimeout(async () => {
          await Router.push(
            {
              pathname: '/forms/creator',
              query: {
                id: res.id,
              },
            },
            `/forms/${res.id}`,
          );
          dispatch(actions.initFormCreator());
        }, 1500);
      }
    }
    if (res === false) throw '500: Server error';
    return res;
  },
  destroyForm: () => destroy(storeFormName),
  toggleFieldSelector: item => ({ type: TOGGLE_FIELD_SELECTOION_MODAL, payload: item }),
  search: text => ({ type: SEARCH, payload: text }),
  modalSearch: text => ({ type: MODAl_SEARCH, payload: text }),
  // BUILDER
  // TODO: partiotions and implement new types, updatePosition remake
  defineItemDesiredPosition: (sourceComponentData, targetComponentData, options = {}) => dispatch =>
    throttledDefineDesiredPosition(dispatch, sourceComponentData, targetComponentData, options),
  setFutureParent: id => dispatch => throttledSetFutureParent(dispatch, id),
  itemDropped: () => ({ type: ITEM_DROPPED }),
  addItem: (type, data = {}) => async (dispatch, gState) => {
    const items = gState().form[storeFormName].values[type.formField];
    const item = type.new(data);
    const itemsPartitioned = partitionByType(items, item, type);
    if (isNumber(data.position) && data.position !== -1) {
      item.position = data.position;
    } else {
      item.position = itemsPartitioned[0].length;
    }
    const newItems = [
      ...take(itemsPartitioned[0], item.position),
      item,
      ...takeRight(itemsPartitioned[0], itemsPartitioned[0].length - item.position).map(
        incrementPosition,
      ),
    ];
    dispatch(change(storeFormName, type.formField, [...itemsPartitioned[1], ...newItems]));
    return true;
  },
  updateItem: (type, item) => async (dispatch, gState) => {
    const items = gState().form[storeFormName].values[type.formField];
    const itemsPartitioned = partitionByType(items, item, type);
    const newItems = [
      ...take(itemsPartitioned[0], item.position),
      item,
      ...takeRight(itemsPartitioned[0], itemsPartitioned[0].length - item.position - 1),
    ];
    dispatch(change(storeFormName, type.formField, [...itemsPartitioned[1], ...newItems]));
    return true;
  },
  updateItemPosition: (type, item, newPosition) => async (dispatch, gState) => {
    const items = gState().form[storeFormName].values[type.formField];
    let newItems = [];
    const itemsPartitioned = partitionByType(items, item, type);
    if (item.position > newPosition) {
      newItems = [
        ...take(itemsPartitioned[0], newPosition),
        {
          item,
          position: newPosition,
        },
        ...slice(itemsPartitioned[0], newPosition, item.position).map(incrementPosition),
        ...takeRight(itemsPartitioned[0], item.position),
      ];
    } else if (item.position < newPosition) {
      newItems = [
        ...take(itemsPartitioned[0], item.position),
        ...slice(itemsPartitioned[0], item.position, newPosition).map(incrementPosition),
        {
          item,
          position: newPosition,
        },
        ...takeRight(itemsPartitioned[0], newPosition),
      ];
    }
    dispatch(change(storeFormName, type.formField, [...itemsPartitioned[1], ...newItems]));
    return true;
  },
  removeItem: (type, item) => async (dispatch, gState) => {
    const items = gState().form[storeFormName].values[type.formField];
    let newItems = [];
    const itemsPartitioned = partitionByType(items, item, type);
    dispatch(actions.recursiveDelete(type, [item.id || item.rawId]));
    if (item.id !== undefined) {
      newItems = [
        ...take(itemsPartitioned[0], item.position),
        {
          id: item.id,
          [type.ownerModelReference]: item[type.ownerModelReference],
          _destroy: true,
        },
        ...takeRight(itemsPartitioned[0], itemsPartitioned[0].length - item.position - 1).map(
          decrementPosition,
        ),
      ];
    } else {
      newItems = [
        ...take(itemsPartitioned[0], item.position),
        ...takeRight(itemsPartitioned[0], itemsPartitioned[0].length - item.position - 1).map(
          decrementPosition,
        ),
      ];
    }
    dispatch(change(storeFormName, type.formField, [...itemsPartitioned[1], ...newItems]));
    return true;
  },
  recursiveDelete: (type, destroyedItemsIDs = []) => (dispatch, gState) => {
    if (destroyedItemsIDs.length && type.dependentModel) {
      const dType = BUILDER_TYPES[type.dependentModel];
      const items = gState().form[storeFormName].values[dType.formField];
      const itemsPartiotioned = partition(items, it =>
        destroyedItemsIDs.includes(it[dType.ownerModelReference]),
      );
      dispatch(actions.recursiveDelete(dType, itemsPartiotioned[0].map(it => it.id || it.rawId)));
      dispatch(change(storeFormName, dType.formField, itemsPartiotioned[1]));
    }
  },
};

// HELPER FUNCTIONS

function formInitializerPresenter(form) {
  const { form_screens, form_groups, form_fields } = form.form_screens.reduce(screenPresenter, {
    form_screens: [],
    form_groups: [],
    form_fields: [],
  });
  return {
    id: form.id,
    name: form.name,
    global: form.global,
    enabled: form.enabled,
    client_id: form.client_id,
    reference_key: form.reference_key,
    form_screens: sortBy(form_screens, ['position']),
    form_groups: sortBy(form_groups, ['form_screen_id', 'position']),
    form_fields: sortBy(form_fields, ['form_group_id', 'position']),
  };
  function screenPresenter(acc, screen) {
    const screenData = {
      id: screen.id,
      name: screen.name,
      position: screen.position,
      form_configuration_id: screen.form_configuration_id,
    };
    const { screenGroups, screenFields } = screen.form_groups.reduce(groupPresenter, {
      screenGroups: [],
      screenFields: [],
    });
    return {
      form_screens: [...acc.form_screens, screenData],
      form_groups: [...acc.form_groups, ...screenGroups],
      form_fields: [...acc.form_fields, ...screenFields],
    };
  }
  function groupPresenter(acc, group) {
    const groupData = {
      id: group.id,
      name: group.name,
      position: group.position,
      form_screen_id: group.form_screen_id,
    };
    return {
      screenGroups: [...acc.screenGroups, groupData],
      screenFields: [...acc.screenFields, ...group.form_fields],
    };
  }
}

function incrementPosition(item) {
  return {
    ...item,
    position: isNumber(item.position) ? item.position + 1 : item.position,
  };
}

function decrementPosition(item) {
  return {
    ...item,
    position: isNumber(item.position) ? item.position - 1 : item.position,
  };
}

function partitionByType(arr, item, type) {
  const filter = type.ownerModelReference && {
    [type.ownerModelReference]: item[type.ownerModelReference],
  };
  const rawPartitions = partition(arr, filter);
  const destroyDivision = partition(rawPartitions[0], { _destroy: true });
  return [destroyDivision[1], [...rawPartitions[1], ...destroyDivision[0]]];
}

const throttledDefineDesiredPosition = throttle(
  (dispatch, sourceComponentData, targetComponentData, options) => {
    const isOnTop = targetComponentData.y + targetComponentData.height / 2 > sourceComponentData.y;
    let predictedPosition = 0;
    if (isNumber(options.position)) {
      predictedPosition = isOnTop ? options.position : options.position + 1;
    } else {
      predictedPosition = isOnTop ? 0 : -1;
    }
    return dispatch({ type: SET_ITEM_FUTURE_POSITION, payload: predictedPosition });
  },
  250,
  { trailing: false },
);

const throttledSetFutureParent = throttle(
  (dispatch, id) => dispatch({ type: SET_ITEM_FUTURE_PARENT, payload: id }),
  300,
  { trailing: false },
);
