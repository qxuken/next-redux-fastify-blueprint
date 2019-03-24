import { projectName } from 'store/constants';

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
