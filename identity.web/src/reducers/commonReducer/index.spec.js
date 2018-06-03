import commonReducer from './index';
import { actionTypes } from '../../actions';
import initialState from '../initialState';

describe('This common reducer', () => {
  it('should not modify state for unreconized action', () => {
    const newState = commonReducer(initialState, { type: 'UNRECONIZED_ACTION' });
    expect(newState).toBe(initialState);
  });

  it('should set application error state on errors', () => {
    const newError = {
      isInErrorState: true,
      error: {
        status: 500,
        messageText: 'Http error'
      }
    };

    const newState = commonReducer(initialState, {
      type: actionTypes.SET_APPLICATION_ERROR_STATE,
      error: newError
    });

    expect(newState.applicationError).toBe(newError);
    expect(newState.applicationError.error.status).toBe(500);
    expect(newState.applicationError.isInErrorState).toBe(true);
    expect(newState.applicationError.error.messageText).toBe('Http error');
  });

  it('should clear application error state on reset error', () => {
    const newError = {
      isInErrorState: true,
      error: {
        status: 500,
        messageText: 'Http error'
      }
    };

    const updatedErrorState = commonReducer(initialState, {
      type: actionTypes.SET_APPLICATION_ERROR_STATE,
      error: newError
    });

    const resetErrorState = commonReducer(updatedErrorState, {
      type: actionTypes.CLEAR_APPLICATION_ERROR_STATE,
      resetError: initialState.common.applicationError
    });

    expect(resetErrorState.applicationError).toBe(initialState.common.applicationError);
    expect(resetErrorState.applicationError.isInErrorState).toBe(false);
    expect(resetErrorState.applicationError.error).toBe(null);
  });

  it('should set application loader on loading', () => {
    const showLoader = {
      isLoading: true
    };

    const newLoadingState = commonReducer(initialState, {
      type: actionTypes.SHOW_LOADER,
      loadingIndicator: showLoader
    });

    expect(newLoadingState.loadingIndicator.isLoading).toBe(true);
  });

  it('should reset application loader after loading completed', () => {
    const showLoader = {
      isLoading: false
    };

    const newLoadingState = commonReducer(initialState, {
      type: actionTypes.SHOW_LOADER,
      loadingIndicator: showLoader
    });

    const resetLoadingState = commonReducer(newLoadingState, {
      type: actionTypes.HIDE_LOADER,
      loadingIndicator: initialState.common.loadingIndicator
    });

    expect(resetLoadingState.loadingIndicator.isLoading).toBe(false);
  });
});
