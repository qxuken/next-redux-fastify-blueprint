import axios from 'axios';
import { get } from 'lodash';
import Router from 'next/router';

export class XhrClient {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.API_HOST,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true,
    });

    const interceptorsConfiguration = [
      config => config,
      error => {
        switch (get(error, 'response.status', 200)) {
          case 401:
            if (!['/signin', '/signup'].includes(window.location.pathname))
              Router.replace('/auth/signin', '/signin');
            break;
          case 403:
            Router.push('/');
            break;
        }
        return Promise.reject(error);
      },
    ];
    this.client.interceptors.request.use(...interceptorsConfiguration);
    this.client.interceptors.response.use(...interceptorsConfiguration);

    if (process.env.FRONT_ENV === 'development') {
      try {
        window.XhrClient = this.client;
      } catch (e) {}
    }
  }

  setCSRF(token) {
    this.client.defaults.headers.common['X-Csrf-Token'] = token;
  }

  get(path, params) {
    return this.client.get(path, params);
  }

  post(path, data) {
    return this.client.post(path, data);
  }

  put(path, data) {
    return this.client.put(path, data);
  }

  delete(path) {
    return this.client.delete(path);
  }
}

export default new XhrClient();
