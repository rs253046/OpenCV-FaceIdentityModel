import authenticationService from '../services/authenticationService';
import config from '../../config/environment';
import cv from 'opencv4nodejs';
import db from '../../lib/database/user';

export default class AuthenticationController {
  post(req, res) {
    res.status(200).json(authenticationService.token);
  }

  authenticationMiddleware(req, res, next) {
    const currentUser = db.users.find(user =>
      (user.username === req.body.username) && (user.password === req.body.password));
    if (!currentUser) {
      authenticationService.isAuthenticated = false;
      res.status(401).send('Unauthorised user');
    } else {
      authenticationService.isAuthenticated = true;
      authenticationService.token.access_token = currentUser.token;
      authenticationService.setCurrentUser(currentUser);
      next();
    }
  }
}
