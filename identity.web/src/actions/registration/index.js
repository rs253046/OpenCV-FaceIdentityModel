import actionTypes from '../actionType';
import { HttpService } from '../../services';
import { API_CONSTANTS } from '../../constants';

function registerUser(registrationDetails) {
  return function (dispatch) {
    return HttpService.post(API_CONSTANTS.REGISTRATION.REGISTER_USER, registrationDetails).subscribe((response) => {
      const user = { ...response, ...registrationDetails };
      dispatch(registerUserSuccess(user));
    }, error => {
      dispatch(registerUserFailed(error));
    });
  };
}

function setUserRegistrationDetail(registrationDetail) {
  return { type: actionTypes.SET_USER_REGISTRATION_DETAIL, registrationDetail };
}

function currentStep(currentStep) {
  return { type: actionTypes.CURRENT_STEP, currentStep };
}

function registerUserSuccess(registration) {
  return { type: actionTypes.REGISTER_USER_SUCCESS, registration };
}

function registerUserFailed(error) {
  return { type: actionTypes.REGISTER_USER_FAILED, error };
}

function clearRegisteredUser() {
  return { type: actionTypes.CLEAR_REGISTERED_USER };
}

export default {
  registerUser,
  clearRegisteredUser,
  currentStep,
  setUserRegistrationDetail
};
