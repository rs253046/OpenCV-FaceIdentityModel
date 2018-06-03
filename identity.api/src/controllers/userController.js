import authenticationService from '../services/authenticationService';
import db from '../../lib/database/user';

export default class UserController {
  get(req, res) {
    res.status(200).json(authenticationService.getCurrentUser(req.headers.authorization));
  }

  authenticationMiddleware(req, res, next) {
    next();
  }
}
