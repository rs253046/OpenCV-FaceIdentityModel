import microsoftFaceApiService from '../../services/microsoftFaceApiService';
import db from '../../../lib/database/user';
import fs from 'fs';
import path from 'path';
import { guid, removeDirectory } from '../../../lib/utils';
import { zip, of } from 'rxjs';
import { combineAll } from 'rxjs/operators';

export default class RegistrationController {

  constructor() {
    this.post = this.post.bind(this);
    this.saveProfilePic = this.saveProfilePic.bind(this);
  }

  post(req, res) {
    const { registration, data } = req.body;
    const { username, emailAddress } = registration;
    this.detect(data).subscribe((detections) => {

      const error = {
        state: false,
        message: {}
      };

      detections.forEach((detection) => {
        if (detection.length > 1) {
          error.state = true;
          error.message = {
            status: 401, data: {
              error: { code: 'MultipleFaceDetected', message: 'Multiple face has been detected.' }
            }
          };
        }
      });

      if (error.state) {
        res.status(error.message.status).json({
          status: error.message,
          data: error.message.data
        });

        return;
      }

      this.identify(detections).subscribe((identifications) => {

        identifications.forEach((identification) => {
          if (identification.length > 0) {
            error.state = true;
            error.message = {
              status: 401, data: {
                error: { code: 'UserAlreadyRegistered', message: 'User is already registered.' }
              }
            };
          }
        });

        if (error.state) {
          res.status(error.message.status).json({
            status: error.message,
            data: error.message.data
          });

          return;
        }

        this.initiateUserRegisteration(req, res);
      }, error => {
        this.initiateUserRegisteration(req, res);
      });
    }, error => this.handleError(error, res));
  }

  initiateUserRegisteration(req, res) {
    const { registration, data } = req.body;
    const { username, emailAddress } = registration;
    this.createPerson(registration).subscribe((person) => {
      const { personId } = person;
      this.addFaces(data, personId).subscribe(() => {
        this.trainPersonGroup().subscribe(() => {
          const newUser = this.createUser({ username, emailAddress, personId });
          db.users.push(newUser);
          this.writeDBFile(newUser);
          this.saveProfilePic(data[0], newUser.id);
          res.status(200).json({
            id: newUser.id,
            personId: newUser.personId
          });
        }, error => this.handleError(error, res));
      }, error => this.handleError(error, res));
    }, error => this.handleError(error, res));
  }

  handleError(error, res) {
    const {
      status,
      statusText,
      data
    } = error;
    res.status(status).json({
      status,
      statusText,
      data
    });
  }

  detect(data) {
    const request = data.map((face, index) => {
      const binary = this.convertBase64ToBinary(face);
      return microsoftFaceApiService.detect(binary, true, false, '');
    });

    return of(...request).pipe(combineAll());
  }

  identify(detections) {
    const request = detections.map((face, index) => {
      return microsoftFaceApiService.identify({ faceIds: face.map(i => i.faceId), personGroupId: 1 });
    });

    return of(...request).pipe(combineAll());
  }

  createPerson(registration) {
    return microsoftFaceApiService.createPerson(1, {
      name: registration.username,
      userData: registration.emailAddress
    })
  }

  trainPersonGroup() {
    return microsoftFaceApiService.trainPersonGroup(1);
  }

  addFaces(faceImages, personId) {
    const request = faceImages.map((face, index) => {
      const binary = this.convertBase64ToBinary(face);
      return microsoftFaceApiService.addFace(1, personId, binary);
    });

    return zip(...request);
  }

  saveProfilePic(data, userId) {
    const base64Data = data.replace(/^data:image\/jpeg;base64,/, "");
    const faceBasePath = path.resolve(`./lib/training/images/${userId || 0}`)
    fs.writeFile(faceBasePath + "/out", base64Data, 'base64', function (err) {
      console.log(err);
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

  convertBase64ToBinary(dataURL) {
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURL.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURL.substring(base64Index);
    return new Buffer(base64, 'base64');
  }
}
