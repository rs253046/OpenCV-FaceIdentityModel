import db from '../../lib/database/user';
class AuthenticationService {

  constructor() {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.token = {
      "access_token": "MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3",
      "token_type": "bearer",
      "expires_in": 30,
      "refresh_token": "IwOGYzYTlmM2YxOTQ5MGE3YmNmMDFkNTVk",
    };
  }

  setToken(token) {
    this.token = token;
  }

  getToken(token) {
    return this.token
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  getCurrentUser(header) {
    if (this.currentUser) {
      return this.currentUser;
    }

    return db.users.find(user => user.token === header.split(' ')[1]);
  }
}

export default new AuthenticationService();
