import express from 'express';
import AuthenticationController from '../../controllers/users/authenticationController';

const authenticationRouter = express.Router();
const authenticationRoute = () => {
  const authenticationController = new AuthenticationController();
  authenticationRouter.use('/', express.urlencoded());
  authenticationRouter.use('/', authenticationController.authenticationMiddleware);
  authenticationRouter.route('/').post(authenticationController.post);
  return authenticationRouter;
}

export default authenticationRoute;