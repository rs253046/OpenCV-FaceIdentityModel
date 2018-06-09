import express from 'express';
import RecognizePhotoBoothController from '../controllers/recognizePhotoBoothController';
import faceRecognitionService from '../services/faceRecognitionService';

const recognizePhotoBoothRouter = express.Router();

const recognizePhotoBooth = (ioSocket) => {
  const recognizePhotoBoothController = new RecognizePhotoBoothController(ioSocket);
  recognizePhotoBoothRouter.route('/recognizeStream').post(recognizePhotoBoothController.recognizeStream);
  return recognizePhotoBoothRouter;
}

export default recognizePhotoBooth;
