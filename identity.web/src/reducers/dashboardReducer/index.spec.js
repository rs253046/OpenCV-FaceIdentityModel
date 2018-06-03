import dashboardReducer from './index';
import { actionTypes } from '../../actions';
import initialState from '../initialState';

describe('This dashboard reducer', () => {
  it('should load dashboard', () => {
    const newState = dashboardReducer(initialState, { type: actionTypes.LOAD_DASHBOARD });
    expect(newState).toBe(initialState);
  });
});
