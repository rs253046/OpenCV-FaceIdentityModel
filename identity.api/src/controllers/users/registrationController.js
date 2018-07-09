import microsoftFaceApiService from '../../services/microsoftFaceApiService';
import db from '../../../lib/database/user';
import fs from 'fs';
import path from 'path';
import { guid,removeDirectory } from '../../../lib/utils';

export default class RegistrationController {

  constructor() {
    this.post = this.post.bind(this);
  }

  post(req, res) {
    const { username, emailAddress } = req.body;
    microsoftFaceApiService.createPerson(1, {
      name: username,
      userData: emailAddress
    }).subscribe((person) => {
      const { personId } = person;
      const newUser = this.createUser({ username, emailAddress, personId });
      db.users.push(newUser);
      this.writeDBFile(newUser);
      res.status(200).json({
        id: newUser.id,
        personId: newUser.personId
      });
    });
  }

  writeDBFile(user) {
    const dbPath = path.resolve('lib/database/user.js');
    const contentbefore = fs.readFileSync(dbPath, 'utf-8');

    const newContent = `}, {
    id: ${user.id},
    username: '${user.username}',
    personId: '${user.personId}',
    emailAddress: '${user.emailAddress}',
    token: '${user.token}',
    password: '${user.password}'
  }]`;

    fs.exists(dbPath, function (exists) {
      if (exists) {
        fs.writeFileSync(dbPath, contentbefore.replace('}]', newContent), 'utf-8');
      }
    })
  }

  createUserIdentity(userDirectory) {
    const faceBasePath = path.resolve(`lib/training/images/${userDirectory}`);
    if (fs.existsSync(faceBasePath)) {
      removeDirectory(faceBasePath);
    }

    fs.mkdirSync(faceBasePath);
  }

  createUser(userDetail) {
    const newUser = {
      id: db.users.length + 1,
      token: guid(),
      username: userDetail.username,
      password: 'identity',
      emailAddress: userDetail.emailAddress,
      personId: userDetail.personId
    }

    this.createUserIdentity(newUser.id);
    return newUser;
  }
}