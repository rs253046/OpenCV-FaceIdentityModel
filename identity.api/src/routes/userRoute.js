import express from 'express';
import UserController from '../controllers/userController';

const userRouter = express.Router();
const userRoute = () => {
  const userController = new UserController();
  userRouter.use('/', userController.authenticationMiddleware);
  userRouter.route('/userInfo').get(userController.get);
  return userRouter;
}

export default userRoute;
