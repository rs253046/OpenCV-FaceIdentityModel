import microsoftFaceApiService from '../../services/microsoftFaceApiService';
import fs from 'fs';
export default class FaceApiController {
  constructor() {
    const methods = this.getMethods();
    this.bindThisReference(methods);
  }

  createPersonGroup(req, res) {
    microsoftFaceApiService.createPersonGroup(req.body.personGroupId, req.body.groupInfo).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  deletePersonGroup(req, res) {
    microsoftFaceApiService.deletePersonGroup(req.body.personGroupId).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  updatePersonGroup(req, res) {
    microsoftFaceApiService.updatePersonGroup(req.body.personGroupId, req.body.groupInfo).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  getPersonGroup(req, res) {
    microsoftFaceApiService.getPersonGroup(req.query.personGroupId).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  getPersonGroups(req, res) {
    microsoftFaceApiService.getPersonGroups().subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  getPersonGroupTrainingStatus(req, res) {
    microsoftFaceApiService.getPersonGroupTrainingStatus(req.query.personGroupId).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  trainPersonGroup(req, res) {
    microsoftFaceApiService.trainPersonGroup(req.body.personGroupId).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  createPerson(req, res) {
    microsoftFaceApiService.createPerson(req.body.personGroupId, req.body.data).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  deletePerson(req, res) {
    microsoftFaceApiService.deletePerson(req.body.personGroupId, req.body.personId).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  getPerson(req, res) {
    microsoftFaceApiService.getPerson(req.query.personGroupId, req.query.personId).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  updatePerson(req, res) {
    microsoftFaceApiService.updatePerson(req.body.personGroupId, req.body.personId, req.body.data).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  getPersons(req, res) {
    microsoftFaceApiService.getPersons(req.query.personGroupId).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  addFace(req, res) {
    const binary = this.convertBase64ToBinary(req.body.data);
    microsoftFaceApiService.addFace(req.body.personGroupId, req.body.personId, binary).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  deleteFace(req, res) {
    microsoftFaceApiService.deleteFace(req.body.personGroupId, req.body.personId, req.body.persistedFaceId).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  getFace(req, res) {
    microsoftFaceApiService.getFace(req.query.personGroupId, req.query.personId, req.query.persistedFaceId).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  getFaces(req, res) {
    microsoftFaceApiService.getFaces(req.query.personGroupId, req.query.personId).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  updateFace(req, res) {
    const binary = this.convertBase64ToBinary(req.body.data);
    microsoftFaceApiService.updateFace(req.body.personGroupId, req.body.personId, req.body.persistedFaceId, binary).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  detect(req, res) {
    const binary = this.convertBase64ToBinary(req.body.data);
    microsoftFaceApiService.detect(
      binary,
      req.body.returnFaceId,
      req.body.returnFaceLandmarks,
      req.body.returnFaceAttributes
    ).subscribe((result) => {
      res.status(200).json(result);
    }, error => this.handleError(error, res));
  }

  identify(req, res) {
    microsoftFaceApiService.identify(req.body).subscribe((result) => {
      res.status(200).json(result);
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

  getMethods() {
    return [
      'createPersonGroup',
      'deletePersonGroup',
      'updatePersonGroup',
      'getPersonGroup',
      'getPersonGroups',
      'getPersonGroupTrainingStatus',
      'trainPersonGroup',
      'getPersons',
      'createPerson',
      'deletePerson',
      'updatePerson',
      'getPerson',
      'addFace',
      'deleteFace',
      'getFace',
      'getFaces',
      'updateFace',
      'identify',
      'detect'
    ];
  }


  bindThisReference(methods) {
    methods.forEach(method => (this[method] = this[method].bind(this)))
  }

  convertBase64ToBinary(dataURL) {
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURL.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURL.substring(base64Index);
    return new Buffer(base64, 'base64');
  }
}