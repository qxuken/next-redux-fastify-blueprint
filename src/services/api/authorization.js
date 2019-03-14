import createRestApi from 'services-folder/api/libs/rest';
import XhrClient from 'services-folder/api/configuration/client';

export default {
  ...createRestApi({ path: '/sessions', model: 'account' }),
  getAccount: () => XhrClient.get('/accounts/me'),
};
