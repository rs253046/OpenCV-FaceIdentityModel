import express from 'express';
import RecognizePhotoBoothController from '../controllers/recognizePhotoBoothController';
import faceRecognitionService from '../services/faceRecognitionService';

const recognizePhotoBoothRouter = express.Router();

const recognizePhotoBooth = (ioSocket) => {
  const recognizePhotoBoothController = new RecognizePhotoBoothController(ioSocket);
  // recognizePhotoBoothRouter.route('/startStreaming').get(recognizePhotoBoothController.startStreaming);
  // recognizePhotoBoothRouter.route('/stopStreaming').get(recognizePhotoBoothController.stopStreaming);
  // recognizePhotoBoothRouter.route('/').get(recognizePhotoBoothController.getIndex);
  return recognizePhotoBoothRouter;
}

export default recognizePhotoBooth;
