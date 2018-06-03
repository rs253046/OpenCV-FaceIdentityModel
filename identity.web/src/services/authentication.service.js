import { Observable, BehaviorSubject } from 'rxjs';
import environment from '../config/environment';
import { API_CONSTANTS } from '../constants';
import LocalStorageService from './local-storage.service';
import HttpService from './http.service';
import { map } from 'rxjs/operators';

class AuthenticationService {
  token;
  localStorage = LocalStorageService;
  isAuthenticated = false;
  serverTokenEndpoint = API_CONSTANTS.AUTHENTICATION.TOKEN;
  refreshAccessTokens = false;
  storageKey = 'admin:authentication';
  authenticationEvent = new BehaviorSubject(this.isAuthenticated);

  constructor() {
    this.restore();
  }

  restore() {
    this.bindStorageEvent();
    const storageData = this.localStorage.getItem(this.storageKey);
    const tokenResponse = storageData ? JSON.parse(storageData) : null;
    this.token = tokenResponse && tokenResponse.access_token;
    if (tokenResponse && tokenResponse.access_token) {
      this.isAuthenticated = true;
      this.authenticationEvent.next(this.isAuthenticated);
    }

    const now = (new Date()).getTime();
    if (tokenResponse && tokenResponse.expires_at && tokenResponse.expires_at > now) {
      this.scheduleRefreshToken(tokenResponse.expires_in, tokenResponse.expires_at, tokenResponse.refresh_token);
    }
  }

  login(username, password) {
    const url = `${environment.hosts}/${this.serverTokenEndpoint}`;
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');
    params.append('client_id', environment.client_id);
    params.append('client_secret', environment.client_secret);
    return this.makeRequest(url, params);
  }

  scheduleRefreshToken(expires_in, expires_at, refresh_token) {
    const now = (new Date()).getTime();
    const offset = (Math.floor(Math.random() * 5) + 5) * 1000; // eslint-disable-line no-magic-numbers
    const timer = expires_at - now - offset;
    setTimeout(() => {
      this.refreshToken(expires_in, refresh_token);
    }, timer);
  }

  makeRequest(url, data) {
    const options = {
      url,
      data: data.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      method: 'POST'
    };

    return HttpService.makeRequest(options).pipe(map((response) => {
      const token = response && response.access_token;
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        this.authenticationEvent.next(this.isAuthenticated);
        this.saveToken(response);
        return true;
      } else {
        return false;
      }
    }));
  }

  refreshToken(expires_in, refresh_token) {
    if (this.refreshAccessTokens) {
      const url = `${environment.hosts}/${this.serverTokenEndpoint}`;
      const data = {
        'grant_type': 'refresh_token',
        refresh_token
      };
      this.makeRequest(url, data).catch((err) => {
        this.clearSession();
        return Observable.throw(err.message);
      }).subscribe(result => {
        this.isAuthenticated = result;
        this.authenticationEvent.next(this.isAuthenticated);
      });
    }
  }

  bindStorageEvent() {
    window.addEventListener('storage', (e) => {
      if (e.key === this.storageKey || e.key === 'impersonatedId') {
        window.location.replace('/');
      }

    }, false);
  }

  saveToken(tokenResponse) {
    const expires_at = new Date().getTime() + (1000 * tokenResponse.expires_in); // eslint-disable-line no-magic-numbers
    tokenResponse.expires_at = expires_at;
    this.scheduleRefreshToken(tokenResponse.expires_in, expires_at, tokenResponse.refresh_token);
    this.localStorage.setItem(this.storageKey, JSON.stringify(tokenResponse));
  }

  clearSession() {
    this.localStorage.removeItem(this.storageKey);
    this.localStorage.removeItem('impersonatedId');
    window.location.reload();
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.clearSession();
  }

}

export default new AuthenticationService();
