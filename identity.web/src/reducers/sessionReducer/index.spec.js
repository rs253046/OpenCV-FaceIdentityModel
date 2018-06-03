import sessionReducer from './index';
import { actionTypes } from '../../actions';
import initialState from '../initialState';

describe('This session reducer', () => {
  it('should create valid application session', () => {
    const newSession = {
      token: '0eeq2312asdgakals234197123sfasdfhakf',
      isAuthenticated: true
    };

    const newSessionState = sessionReducer(initialState.session, {
      type: actionTypes.CREATE_SESSION,
      session: newSession
    });

    expect(newSessionState.isAuthenticated).toEqual(newSession.isAuthenticated);
    expect(newSessionState.token).toEqual(newSession.token);
  });

  it('should invalidate current application session', () => {
    const newSessionState = sessionReducer(initialState.session, {
      type: actionTypes.INVALIDATE_SESSION,
      session: initialState.session
    });

    expect(newSessionState.isAuthenticated).toEqual(initialState.session.isAuthenticated);
    expect(newSessionState.token).toEqual(initialState.session.token);
  });

  it('should load current user info', () => {
    const newUser = {
      name: 'John',
      id: '1'
    };

    const newUserInfoState = sessionReducer(initialState.session, {
      type: actionTypes.LOAD_USER_INFO,
      userInfo: newUser
    });

    expect(newUserInfoState.session.currentUser).toEqual(newUser);
  });

  it('should set session errors', () => {
    const newSessionError = { status: 500, messageText: 'Http error' };

    const newSessionErrorState = sessionReducer(initialState.session, {
      type: actionTypes.SET_SESSION_ERRORS,
      error: newSessionError
    });

    expect(newSessionErrorState.errors).toEqual(newSessionError);
  });

  it('should reset session errors', () => {
    const newSessionError = { status: 500, messageText: 'Http error' };

    sessionReducer(initialState.session, {
      type: actionTypes.SET_SESSION_ERRORS,
      error: newSessionError
    });

    const newResetSessionErrorState = sessionReducer(initialState.session, {
      type: actionTypes.CLEAR_SESSION_ERRORS,
      error: null
    });

    expect(newResetSessionErrorState.errors).toEqual(null);
  });

  it('should destroy session', () => {
    const newSessionState = sessionReducer(initialState.session, {
      type: actionTypes.LOGOUT,
      session: initialState.session
    });

    expect(newSessionState.isAuthenticated).toEqual(initialState.session.isAuthenticated);
    expect(newSessionState.token).toEqual(initialState.session.token);
  });
});
