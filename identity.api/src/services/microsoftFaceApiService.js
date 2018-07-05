import config from '../config/environment';
import HttpService from './http.service';

class MicrosoftFaceApiService {
  createPersonGroup(personGroupId, groupInfo) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}`;
    return HttpService.post(url, groupInfo, headers);
  }

  deletePersonGroup(personGroupId) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}`;
    return HttpService.del(url, headers);
  }

  updatePersonGroup(personGroupId, groupInfo) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}`;
    return HttpService.patch(url, groupInfo, headers);
  }

  getPersonGroup() {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}`;
    return HttpService.get(url, headers);
  }

  getPersonGroups() {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups`;
    return HttpService.get(url, headers);
  }

  getPersonGroupTrainingStatus(personGroupId) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}/training`;
    return HttpService.get(url, headers);
  }

  trainPersonGroup(personGroupId) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}/train`;
    return HttpService.post(url, {}, headers);
  }

  createPerson(personGroupId, data) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}/persons`;
    return HttpService.post(url, data, headers);
  }

  deletePerson(personGroupId, personId) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}/persons/${personId}`;
    return HttpService.del(url, headers);
  }

  getPerson(personGroupId, personId) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}/persons/${personId}`;
    return HttpService.get(url, headers);
  }

  updatePerson(personGroupId, personId, data) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}/persons/${personId}`;
    return HttpService.patch(url, data, headers);
  }

  getPersons(personGroupId) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}/persons`;
    return HttpService.get(url, headers);
  }

  addFace(personGroupId, personId, data) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}/persons/${personId}/persistedFaces`;
    return HttpService.post(url, data, headers);
  }

  deleteFace() {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}/persons/${personId}/persistedFaces`;
    return HttpService.del(url, headers);
  }

  getFace(personGroupId, personId, persistedFaceId) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}/persons/${personId}/persistedFaces/${persistedFaceId}`;
    return HttpService.get(url, headers);
  }

  getFaces(personGroupId, personId) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}/persons/${personId}/persistedFaces`;
    return HttpService.get(url, headers);
  }

  updateFace(personGroupId, personId, persistedFaceId, data) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/persongroups/${personGroupId}/persons/${personId}/persistedFaces/${persistedFaceId}`;
    return HttpService.patch(url, data, headers);
  }

  detect() {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/detect?returnFaceId=${returnFaceId}&returnFaceLandmarks=${returnFaceLandmarks}&returnFaceAttributes=${returnFaceAttributes}`;
    return HttpService.post(url, data, headers);
  }

  identify(data) {
    const headers = this.getHeaders();
    const url = `${config.microsoftFaceApi.endpoint}/identify`;
    return HttpService.post(url, data, headers);
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': config.microsoftFaceApi.keys[1]
    }
  }
}

export default new MicrosoftFaceApiService();