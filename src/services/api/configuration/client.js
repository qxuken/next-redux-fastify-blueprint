import axios from 'axios';
import { set, unset } from 'lodash';
import Router from 'next/router';
import Console from 'services/Console';

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
      function(config) {
        return config;
      },
      function(error) {
        return Promise.reject(error);
      },
    ];
    this.client.interceptors.request.use(...interceptorsConfiguration);
    this.client.interceptors.response.use(...interceptorsConfiguration);

    if (process.env.FRONT_ENV === 'development') {
      try {
        window._XHR_CLIENT_DEBUG_ = this;
        window._NEXT_ROUTER_DEBUG_ = Router;
      } catch (e) {
        Console.error(e);
      }
    }
  }

  setHeader(header, value) {
    set(this.client, `defaults.headers.common['${header}']`, value);
  }

  releaseHeader(header) {
    unset(this.client, `defaults.headers.common['${header}']`);
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
