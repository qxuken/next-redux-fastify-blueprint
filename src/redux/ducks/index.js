import { set, compact } from 'lodash';
import * as system from 'redux-folder/ducks/system';
import * as layout from 'redux-folder/ducks/layout';
import * as adminCrud from 'redux-folder/ducks/adminCrud';
import * as clientForms from 'redux-folder/ducks/client/forms';
import * as authorization from 'redux-folder/ducks/authorization';
import * as notifications from 'redux-folder/ducks/notifications';
import * as customerForms from 'redux-folder/ducks/customer/forms';

const ducks = [system, layout, authorization, notifications, adminCrud, clientForms, customerForms];

const ducksToObject = (acc, it) => ({ ...acc, [it.storeName]: it.reducer });

export const reducers = ducks.reduce(ducksToObject, {});
