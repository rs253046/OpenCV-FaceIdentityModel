import express from 'express';
import PhotoboothController from '../controllers/photoboothController';
import faceRecognitionService from '../services/faceRecognitionService';
const photoboothRouter = express.Router();

const photoboothRoute = (ioSocket) => {
  const photoboothController = new PhotoboothController(ioSocket);
  // photoboothRouter.route('/startStreaming').get(photoboothController.startStreaming);
  // photoboothRouter.route('/stopStreaming').get(photoboothController.stopStreaming);
  // photoboothRouter.route('/').get(photoboothController.getIndex);
  return photoboothRouter;
}

export default photoboothRoute;
