import authenticationService from '../../services/authenticationService';
import path from 'path';
import fs from 'fs';

export default class UserController {
  constructor() {
    this.authenticationMiddleware = this.authenticationMiddleware.bind(this);
  }

  get(req, res) {
    res.status(200).json(authenticationService.getCurrentUser(req.headers.authorization));
  }

  getProfilePic(req, res) {
    const { userId } = req.query;
    const faceBasePath = path.resolve(`./lib/training/images/${userId || 0}`);
    const faceImageList = fs.readdirSync(faceBasePath);
    let readStream = fs.createReadStream(path.resolve(faceBasePath, faceImageList[0]));
    var base64data = '';
    readStream.on('data', function(result) {
      base64data += new Buffer(result).toString('base64');
    });

    readStream.on('end', function() {
      res.status(200).json({data: base64data});
    });

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
    const db = require('../../../lib/database/user').default;
    const token = authorization && authorization.split(' ')[1];
    const user = db.users.find(user => user.token === token);
    return !!user;
  }
}