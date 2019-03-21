import { actions as notificationsActions } from 'redux-folder/ducks/notifications';

export const projectName = 'aid';

export function actionTemplate(storeName) {
  return action => `${projectName}/${storeName}/${action}`;
}

export function xhrActionTemplate(actionTemplate) {
  return action => ({
    REQ: `${actionTemplate(action)}/REQ`,
    RES: `${actionTemplate(action)}/RES`,
    FAIL: `${actionTemplate(action)}/FAIL`,
  });
}

export function xhrAction(xhrActionName, apiCall, options = {}) {
  return itemData =>
    async function(dispatch) {
      await dispatch({ type: xhrActionName.REQ });
      try {
        const res = await apiCall(itemData);
        await dispatch({ type: xhrActionName.RES, payload: res.data });
        if (options.onSuccess) options.onSuccess(res.data, ...arguments);
        return res.data;
      } catch (e) {
        if (!options.suppressNotification) {
          await dispatch(
            notificationsActions.enqueueSnackbar({
              message: 'Server error.',
              options: {
                variant: 'error',
              },
            }),
          );
        }
        await dispatch({ type: xhrActionName.FAIL, payload: e });
        if (options.onFail) options.onFail(res.data, ...arguments);
        return false;
      }
    };
}
