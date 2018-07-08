import actionTypes from '../actionType';
import { HttpService, AuthenticationService } from '../../services';
import { API_CONSTANTS } from '../../constants';

function createSession(session) {
  return { type: actionTypes.CREATE_SESSION, session };
}

function invalidateSession(session) {
  return { type: actionTypes.INVALIDATE_SESSION, session };
}

function loadUserInfo(userInfo) {
  return { type: actionTypes.LOAD_USER_INFO, userInfo };
}

function setSessionError(error) {
  return { type: actionTypes.SET_SESSION_ERRORS, error };
}

function clearSessionError(error = {}) {
  return { type: actionTypes.CLEAR_SESSION_ERRORS, error };
}

function logout() {
  return function (dispatch) {
    AuthenticationService.logout();
  };
}

function loadUserProfilePic(profilePic) {
  return { type: actionTypes.USER_PROFILE_PIC, profilePic: { profilePic: profilePic.data }};
}

function getUserProfilePic(userInfo) {
  return function (dispatch) {
    return HttpService.get(API_CONSTANTS.AUTHENTICATION.USER_PROFILE_PIC, { userId: userInfo.id })
      .subscribe((profilePic) => {
        dispatch(loadUserProfilePic(profilePic));
        dispatch(loadUserInfo(userInfo));
      });
  }; 
}

function getUser() {
  return function (dispatch) {
    return HttpService.get(API_CONSTANTS.AUTHENTICATION.USER_INFO).subscribe((userInfo) => {
      dispatch(getUserProfilePic(userInfo));
    });
  };
}

function restoreSession() {
  return function (dispatch) {
    return AuthenticationService.authenticationEvent.subscribe((isAuthenticated) => {
      const session = {
        token: AuthenticationService.token,
        isAuthenticated
      };

      dispatch(createSession(session));

      if (isAuthenticated) {
        dispatch(getUser());
      }
    });
  };
}

function login(user) {
  const { username, password } = user;
  return function (dispatch) {
    dispatch(clearSessionError());
    return AuthenticationService.login(username, password).subscribe((isAuthenticated) => {
      const session = {
        token: AuthenticationService.token,
        isAuthenticated
      };

      dispatch(createSession(session));
    }, error => {
      dispatch(setSessionError({ loginFailed: 'Your face identity does not exists.' }));
      // throw error;
    });
  };
}

export default {
  createSession,
  login,
  logout,
  restoreSession,
  getUser,
  invalidateSession,
  clearSessionError,
  setSessionError
};

// export function loadDashboard() {
//   return function (dispatch) {
//     return courseApi.getAllCourses().then(courses => {
//       dispatch(loadCoursesSuccess(courses));
//     }).catch(error => {
//       throw(error);
//     });
//   };
// }
