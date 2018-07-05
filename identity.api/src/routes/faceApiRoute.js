import express from 'express';
import FaceApiController from '../controllers/faceApiController';

const faceApiRouter = express.Router();

const faceApiRoute = () => {
  const faceApiController = new FaceApiController();

  faceApiRouter.route('/createPersonGroup').post(faceApiController.createPersonGroup);
  faceApiRouter.route('/deletePersonGroup').delete(faceApiController.deletePersonGroup);
  faceApiRouter.route('/updatePersonGroup').patch(faceApiController.updatePersonGroup);
  faceApiRouter.route('/getPersonGroup').get(faceApiController.getPersonGroup);
  faceApiRouter.route('/getPersonGroups').post(faceApiController.getPersonGroups);
  faceApiRouter.route('/getPersonGroupTrainingStatus').get(faceApiController.getPersonGroupTrainingStatus);
  faceApiRouter.route('/trainPersonGroup').post(faceApiController.trainPersonGroup);

  faceApiRouter.route('/createPerson').post(faceApiController.createPerson);
  faceApiRouter.route('/deletePerson').delete(faceApiController.deletePerson);
  faceApiRouter.route('/getPerson').get(faceApiController.getPerson);
  faceApiRouter.route('/updatePerson').patch(faceApiController.updatePerson);
  faceApiRouter.route('/getPersons').get(faceApiController.getPersons);

  faceApiRouter.route('/addFace').post(faceApiController.addFace);
  faceApiRouter.route('/deleteFace').delete(faceApiController.deleteFace);
  faceApiRouter.route('/getFace').get(faceApiController.getFace);
  faceApiRouter.route('/getFaces').get(faceApiController.getFaces);
  faceApiRouter.route('/updateFace').patch(faceApiController.updateFace);

  faceApiRouter.route('/detect').post(faceApiController.detect);
  faceApiRouter.route('/identify').post(faceApiController.identify);

  return faceApiRouter;
}

export default faceApiRoute;