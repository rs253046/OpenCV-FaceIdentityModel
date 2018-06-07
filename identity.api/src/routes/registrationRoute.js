import express from 'express';
import RegistrationController from '../controllers/registrationController';

const registrationRouter = express.Router();
const registrationRoute = () => {
  const registrationController = new RegistrationController();
  registrationRouter.route('/registerUser').post(registrationController.post);
  return registrationRouter;
}

export default registrationRoute;