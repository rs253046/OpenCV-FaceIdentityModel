import express from 'express';
import TrainingController from '../controllers/trainingController';
import faceRecognitionService from '../services/faceRecognitionService';
const trainingRouter = express.Router();

const trainingRoute = (ioSocket) => {
  const trainingController = new TrainingController(ioSocket);
  trainingRouter.route('/saveSnapshots').post(trainingController.saveSnapshots);
  trainingRouter.route('/trainIdentityModel').post(trainingController.trainIdentityModel);
  return trainingRouter;
}

export default trainingRoute;
