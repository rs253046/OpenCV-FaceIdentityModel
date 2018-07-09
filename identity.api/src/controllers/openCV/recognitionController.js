import faceRecognitionService from '../../services/faceRecognitionService';
import config from '../../../config/environment';
import cv from 'opencv4nodejs';
import fs from 'fs';
import path from 'path';
import {
  convertBase64ImageToBuffer
} from '../../../lib/utils';

export default class RecognitionController {

  recognizeStream(req, res) {
    const {
      saveFaceImages,
      detectFaces
    } = faceRecognitionService;
    const {
      data
    } = req.body;
    const faceBasePath = path.resolve('./lib/training/images');
    const frames = data.map(base64Image => cv.imdecode(convertBase64ImageToBuffer(base64Image).buffer));
    let results = [];
    frames.forEach(frame => {
      try {
        const runDetection = faceRecognitionService.makeRunVideoFaceRecognition();
        results = results.concat(runDetection(frame, detectFaces).result);
      } catch (err) {}
    })

    results = results.filter(result => result.label > -1);

    if (results.length > 0) {
      results = results.sort((a, b) => {
        return a.confidence - b.confidence;
      });
    }
    console.log(results);

    const prediction = results[0];
    res.status(200).json({
      prediction: prediction
    });
  }
}