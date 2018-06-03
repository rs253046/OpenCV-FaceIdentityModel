import { DashboardMain, Login, Logout, FaceDetectionMain, FaceRecognitionMain } from './components';
import { APP_ROUTES, APP_CONSTANTS } from './constants';

const routes = [
  {
    path: APP_ROUTES.DASHBOARD,
    component: DashboardMain,
    type: APP_CONSTANTS.AUTHENTICATED_ROUTE
  }, {
    path: APP_ROUTES.LOGIN,
    component: Login,
    type: APP_CONSTANTS.UNAUTHENTICATED_ROUTE
  },
  {
    path: APP_ROUTES.LOGOUT,
    component: Logout,
    type: APP_CONSTANTS.AUTHENTICATED_ROUTE
  },
  {
    path: APP_ROUTES.FACE_DETECTION,
    component: FaceDetectionMain,
    type: APP_CONSTANTS.AUTHENTICATED_ROUTE
  },
  {
    path: APP_ROUTES.FACE_RECOGNITION,
    component: FaceRecognitionMain,
    type: APP_CONSTANTS.AUTHENTICATED_ROUTE
  }
];

export default routes;
