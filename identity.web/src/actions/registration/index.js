import actionTypes from '../actionType';
import { HttpService } from '../../services';
import { API_CONSTANTS } from '../../constants';

function registerUser(registrationDetails) {
  return function (dispatch) {
    return HttpService.post(API_CONSTANTS.REGISTRATION.REGISTER_USER, registrationDetails).subscribe((response) => {
      const user = { ...response, ...registrationDetails };
      dispatch(registerUserSuccess(user));
    });
  };
}

function registerUserSuccess(registration) {
  return { type: actionTypes.REGISTER_USER_SUCCESS, registration };
}

function clearRegisteredUser() {
  return { type: actionTypes.CLEAR_REGISTERED_USER };
}

export default {
  registerUser,
  clearRegisteredUser
};
