import { actionTypes } from '../../actions';
import initialState from '../initialState';

export default function registrationReducer(state = initialState.registration, action) {
  switch (action.type) {
    case actionTypes.REGISTER_USER_SUCCESS:
      const registration = {
        step1: action.registration,
        step2: {}
      };
      return Object.assign({}, state, registration);
    default:
      return state;
  }
}
