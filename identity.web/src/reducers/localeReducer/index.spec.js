import localeReducer from './index';
import initialState from '../initialState';

describe('This locale reducer', () => {
  it('should set locale', () => {
    const newState = localeReducer(initialState, { type: 'UNRECOGNISED_ACTION' });
    expect(newState).toBe(initialState);
  });
});
