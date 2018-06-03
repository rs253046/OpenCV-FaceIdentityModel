import { actionTypes } from '../../actions';
import initialState from '../initialState';

export default function dashboardReducer(state = initialState.dashboard, action) {
  switch (action.type) {
    case actionTypes.STREAMING_STARTED:
      return Object.assign({}, state, action.streaming);
    case actionTypes.STREAMING_ENDED:
      return Object.assign({}, state, action.streaming);
    default:
      return state;
  }
}
