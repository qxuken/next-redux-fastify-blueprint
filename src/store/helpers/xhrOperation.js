import Console from 'services/Console';

export default function xhrOperationTemplate(
  xhrActionName,
  apiCall,
  options = {},
) {
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
          Console.error(e);
        }
        await dispatch({ type: xhrActionName.FAIL, payload: e });
        if (options.onFail) options.onFail(e, ...arguments);
        return false;
      }
    };
}
