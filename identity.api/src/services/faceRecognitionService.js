import  { makeRunVideoFaceDetection, saveFaceImages, detectFaces, makeRunVideoFaceRecognition, trainFaceIdentityModel } from '../../lib/commons';
import  { videoStream, calculateMaxPrediction } from '../../lib/utils';
import cv from 'opencv4nodejs';

class faceRecognitionService {
  makeRunVideoFaceDetection() {
    return makeRunVideoFaceDetection();
  }

  makeRunVideoFaceRecognition() {
    return makeRunVideoFaceRecognition();
  }

  detectFaces(...args) {
    return detectFaces(...args);
  }

  saveFaceImages(...args) {
    return saveFaceImages(...args);
  }

  videoStream(...args) {
    return videoStream(...args);
  }

  createImageBase64Buffer(image) {
    const outBase64 = cv.imencode('.jpg', image).toString('base64');
    return Buffer.from(outBase64, 'base64');
  }

  trainFaceIdentityModel() {
    return trainFaceIdentityModel()
  }

  calculateMaxPrediction(results) {
    return calculateMaxPrediction(results);
  }
}

export default new faceRecognitionService();
