import express from 'express';
import UserController from '../../controllers/users/userController';

const userRouter = express.Router();
const userRoute = () => {
  const userController = new UserController();
  userRouter.use('/', userController.authenticationMiddleware);
  userRouter.route('/userInfo').get(userController.get);
  userRouter.route('/profilePic').get(userController.getProfilePic);
  return userRouter;
}

export default userRoute;