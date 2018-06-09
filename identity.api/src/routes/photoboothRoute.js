import express from 'express';
import PhotoboothController from '../controllers/photoboothController';
import faceRecognitionService from '../services/faceRecognitionService';
const photoboothRouter = express.Router();

const photoboothRoute = (ioSocket) => {
  const photoboothController = new PhotoboothController(ioSocket);
  photoboothRouter.route('/saveSnapshots').post(photoboothController.saveSnapshots);
  photoboothRouter.route('/trainIdentityModel').post(photoboothController.trainIdentityModel);
  return photoboothRouter;
}

export default photoboothRoute;
