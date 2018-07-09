import cv from 'opencv4nodejs';
import fs from 'fs';
import path from 'path';
import {
  convertBase64ImageToBuffer
} from '../../../lib/utils';
import faceRecognitionService from '../../services/faceRecognitionService';

export default class TrainingController {

  saveSnapshots(req, res) {
    const {
      saveFaceImages,
      detectFaces
    } = faceRecognitionService;
    const {
      data,
      userId
    } = req.body;
    const faceBasePath = path.resolve(`./lib/training/images/${userId || 0}`);
    const frame = cv.imdecode(convertBase64ImageToBuffer(data).buffer);
    saveFaceImages(frame, detectFaces, faceBasePath);
    res.status(200).json({
      success: true,
      faceCount: fs.readdirSync(faceBasePath).length
    });
  }

  trainIdentityModel(req, res) {
    faceRecognitionService.trainFaceIdentityModel().then(() => {
      res.status(200).json({
        status: 'done'
      });
    });
  }
}