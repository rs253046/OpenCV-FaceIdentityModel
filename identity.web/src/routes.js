import { DashboardMain, Login, Logout, Registration } from './components';
import { APP_ROUTES, APP_CONSTANTS } from './constants';
const { RegistrationStep1, RegistrationStep2, RegistrationStep3 } = Registration;

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
    path: APP_ROUTES.REGISTRATION.STEP_1,
    component: RegistrationStep1,
    type: APP_CONSTANTS.UNAUTHENTICATED_ROUTE
  },
  {
    path: APP_ROUTES.REGISTRATION.STEP_2,
    component: RegistrationStep2,
    type: APP_CONSTANTS.UNAUTHENTICATED_ROUTE
  },
  {
    path: '/test',
    component: RegistrationStep3,
    type: APP_CONSTANTS.UNAUTHENTICATED_ROUTE
  }
];

export default routes;
