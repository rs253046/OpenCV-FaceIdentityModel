import developmentEnvironment from './environment.dev';
import stagingEnvironment from './environment.staging';
import testingEnvironment from './environment.testing';
import productionEnvironment from './environment.prod';
import { APP_CONSTANTS } from '../../constants';

export default ((environment) => {
  const ENV = { };

  if (environment === APP_CONSTANTS.ENVIRONMENT.DEVELOPMENT) {
    Object.assign(ENV, developmentEnvironment);
  }

  if (environment === APP_CONSTANTS.ENVIRONMENT.PRODUCTION) {
    Object.assign(ENV, productionEnvironment);
  }

  if (environment === APP_CONSTANTS.ENVIRONMENT.TESTING) {
    Object.assign(ENV, testingEnvironment);
  }

  if (environment === APP_CONSTANTS.ENVIRONMENT.STAGING) {
    Object.assign(ENV, stagingEnvironment);
  }

  return ENV;
})(process.env.REACT_APP_STAGE);
