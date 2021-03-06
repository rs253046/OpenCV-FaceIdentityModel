import { actionTypes } from '../../actions';
import initialState from '../initialState';

export default function commonReducer(state = initialState.common, action) {
  switch (action.type) {
    case actionTypes.SET_APPLICATION_ERROR_STATE:
      return Object.assign({}, state, { applicationError: action.error });
    case actionTypes.CLEAR_APPLICATION_ERROR_STATE:
      return Object.assign({}, state, { applicationError: action.resetError });
    case actionTypes.SHOW_LOADER:
      return Object.assign({}, state, { loadingIndicator: action.loadingIndicator });
    case actionTypes.HIDE_LOADER:
      return Object.assign({}, state, { loadingIndicator: action.loadingIndicator });
    case actionTypes.CONNECT_TO_SOCKET:
      console.log(action.socket)
      return Object.assign({}, state, { socket: action.socket });
    default:
      return state;
  }
}
