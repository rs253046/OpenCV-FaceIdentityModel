import { actionTypes } from '../../actions';
import initialState from '../initialState';

export default function sessionReducer(state = initialState.session, action) {
  switch (action.type) {
    case actionTypes.CREATE_SESSION:
      return Object.assign({}, state, action.session);
    case actionTypes.INVALIDATE_SESSION:
      return Object.assign({}, state, action.session);
    case actionTypes.LOAD_USER_INFO:
      return Object.assign({}, state, { currentUser: action.userInfo });
    case actionTypes.SET_SESSION_ERRORS:
      return Object.assign({}, state, { errors: action.error });
    case actionTypes.CLEAR_SESSION_ERRORS:
      return Object.assign({}, state, { errors: action.error });
    case actionTypes.LOGOUT:
      return Object.assign({}, state, initialState.session);
    default:
      return state;
  }
}
