import { actionTypes } from '../../actions';
import initialState from '../initialState';

export default function registrationReducer(state = initialState.registration, action) {
  switch (action.type) {
    case actionTypes.REGISTER_USER_SUCCESS:
      return Object.assign({}, state, { currentStep: 3 });
    case actionTypes.SET_USER_REGISTRATION_DETAIL:
      return Object.assign({}, state, { registration: action.registrationDetail });
    case actionTypes.CURRENT_STEP:
      return Object.assign({}, state, { currentStep: action.currentStep });
    case actionTypes.REGISTER_USER_FAILED:
      return Object.assign({}, state, { ...initialState.registration, error: action.error } );
    case actionTypes.CLEAR_REGISTERED_USER:
      return Object.assign({}, state, initialState.registration);
    default:
      return state;
  }
}
