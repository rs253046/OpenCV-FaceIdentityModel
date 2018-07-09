import authenticationService from '../../services/authenticationService';
import fs from 'fs';
import path from 'path';

export default class AuthenticationController {
  constructor() {
    this.authenticationMiddleware = this.authenticationMiddleware.bind(this);
  }

  post(req, res) {
    res.status(200).json(authenticationService.token);
  }

  authenticationMiddleware(req, res, next) {
    const db = require('../../../lib/database/user').default;
    const userInfo = JSON.parse(req.body.username);

    const currentUser = db.users.find(user =>
      (user.personId == userInfo.personId) && (user.password === req.body.password));
    if (!currentUser) {
      authenticationService.isAuthenticated = false;
      res.status(401).send('Unauthorised user');
    } else {
      this.saveFaceInfo(userInfo);
      authenticationService.isAuthenticated = true;
      authenticationService.token.access_token = currentUser.token;
      authenticationService.setCurrentUser({ ...currentUser, ...userInfo});
      next();
    }
  }

  saveFaceInfo(userInfo) {
    this.writeDBFile(userInfo);
  }

  writeDBFile(faceInfo) {
    const dbPath = path.resolve('lib/database/faceInfo.js');
    const contentbefore = fs.readFileSync(dbPath, 'utf-8');

    const newContent = `}, {
      faceInfo: ${JSON.stringify(faceInfo)}
  }]`;

    fs.exists(dbPath, function (exists) {
      if (exists) {
        fs.writeFileSync(dbPath, contentbefore.replace('}]', newContent), 'utf-8');
      }
    })
  }
}