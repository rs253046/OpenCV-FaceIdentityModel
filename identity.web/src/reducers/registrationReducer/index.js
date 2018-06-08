import { actionTypes } from '../../actions';
import initialState from '../initialState';

export default function registrationReducer(state = initialState.registration, action) {
  switch (action.type) {
    case actionTypes.REGISTER_USER_SUCCESS:
      return Object.assign({}, state, {
        step1: action.registration,
        step2: {},
        currentStep: 2
      });
    case actionTypes.CLEAR_REGISTERED_USER:
      return Object.assign({}, state, initialState.registration);
    default:
      return state;
  }
}
