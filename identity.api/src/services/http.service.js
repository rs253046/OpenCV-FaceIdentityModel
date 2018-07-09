import {
  Observable,
  of ,
  throwError,
  BehaviorSubject
} from 'rxjs';
import axios from 'axios';
import environment from '../../config/environment';
import {
  map,
  retryWhen,
  takeWhile,
  switchMap
} from 'rxjs/operators';
import APP_CONSTANTS from '../constants/appConstants';

class HttpService {
  constructor() {
    this.baseConfiguration = {
      url: '',
      method: APP_CONSTANTS.HTTP.METHOD.GET,
      baseURL: '',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    };
    this._retryRequestAttempts = 3; // eslint-disable-line no-magic-numbers
    this._retryStatusCodes = [502, 0]; // eslint-disable-line no-magic-numbers
    this._pendingRequests = 0; // eslint-disable-line no-magic-numbers
    this._isHttpLoading = false;
    this.httpLoadingEvent = new BehaviorSubject({
      isHttpLoading: this._isHttpLoading
    });
    this.registerInterceptors();
  }

  get(url, params = {}) {
    const setting = {
      method: APP_CONSTANTS.HTTP.METHOD.GET,
      url,
      ...params
    };

    return this.prepareRequest(setting);
  }

  post(url, data, params = {}) {
    const setting = {
      method: APP_CONSTANTS.HTTP.METHOD.POST,
      url,
      data,
      ...params
    };

    return this.prepareRequest(setting);
  }

  put(url, data, params = {}) {
    const setting = {
      method: APP_CONSTANTS.HTTP.METHOD.PUT,
      url,
      data,
      ...params
    };

    return this.prepareRequest(setting);
  }

  patch(url, data, params = {}) {
    const setting = {
      method: APP_CONSTANTS.HTTP.METHOD.PATCH,
      url,
      data,
      ...params
    };

    return this.prepareRequest(setting);
  }

  del(url, params = {}) {
    const setting = {
      method: APP_CONSTANTS.HTTP.METHOD.DELETE,
      url,
      ...params
    };

    return this.prepareRequest(setting);
  }

  getHost(url) {
    const urlKey = url.split('/')[0]; // eslint-disable-line no-magic-numbers
    return environment.hosts[urlKey] || '';
  }

  prepareRequest(setting) {
    const config = Object.assign({}, this.baseConfiguration, setting);
    return this.makeRequest({
      ...config
    });
  }

  makeRequest(request) {
    const {
      _retryRequestAttempts,
      _retryStatusCodes
    } = this;
    return new Observable((o) => {
      const source = axios.CancelToken.source();
      o.add(() => source.cancel('Operation canceled by the user.'));
      axios({
        ...request,
        cancelToken: source.token
      }).then((response) => {
        o.next(response);
      }).catch((err) => {
        if (err.response) {
          o.error(err.response);
          throw err.response;
        }
      });
    }).pipe(map(res => res.data), retryWhen(errors => errors.pipe(takeWhile((error, count) => {
      if (_retryRequestAttempts === count) {
        throw error;
      }
      return count < _retryRequestAttempts;
    }), switchMap((x) => {
      if (_retryStatusCodes.indexOf(x.status) > -1) { // eslint-disable-line no-magic-numbers
        return of(x);
      }
      return throwError(x);
    }))));
  }

  registerInterceptors() {
    this.registerRequestInterceptor();
    this.registerResponseInterceptor();
  }

  registerRequestInterceptor() {
    axios.interceptors.request.use((config) => {
      if (!this._isHttpLoading) {
        this._isHttpLoading = true;
        this.httpLoadingEvent.next({
          isHttpLoading: this._isHttpLoading
        });
      }

      this._pendingRequests++;
      return config;
    }, error => Promise.reject(error));
  }

  registerResponseInterceptor() {
    axios.interceptors.response.use((response) => {
      this._pendingRequests--;
      if (this._pendingRequests === 0) { // eslint-disable-line no-magic-numbers
        this._isHttpLoading = false;
        this.httpLoadingEvent.next({
          isHttpLoading: this._isHttpLoading
        });
      }
      return response;
    }, error => Promise.reject(error));
  }
}

export default new HttpService();