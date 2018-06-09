import authenticationService from '../services/authenticationService';

export default class UserController {
  constructor() {
    this.authenticationMiddleware = this.authenticationMiddleware.bind(this);
  }

  get(req, res) {
    res.status(200).json(authenticationService.getCurrentUser(req.headers.authorization));
  }

  authenticationMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      this.validateuser(req.headers.authorization) ?
        next() : res.sendStatus(401);
    }
  }

  validateuser(authorization) {
    const db = require('../../lib/database/user').default;
    const token = authorization && authorization.split(' ')[1];
    const user = db.users.find(user => user.token ===token);
    return !!user;
  }
}
