import express from 'express';
import RecognitionController from '../controllers/recognitionController';
import faceRecognitionService from '../services/faceRecognitionService';

const recognitionRouter = express.Router();

const recognitionRoute = (ioSocket) => {
  const recognitionController = new RecognitionController(ioSocket);
  recognitionRouter.route('/predictions').post(recognitionController.recognizeStream);
  return recognitionRouter;
}

export default recognitionRoute;
