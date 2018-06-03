import { createStore } from 'redux';
import rootReducer from '../../reducers';
import initialState from '../../reducers/initialState';
import { sessionAction, commonAction } from '../../actions';

describe('Store', () => {
  describe('Store behaviour on application session', () => {
    it('should create valid session', () => {
      const store = createStore(rootReducer, initialState);
      const session = {
        token: '0eeq2312asdgakals234197123sfasdfhakf',
        isAuthenticated: true
      };
      const action = sessionAction.createSession(session);
      store.dispatch(action);

      const actual = {
        isAuthenticated: store.getState().session.isAuthenticated,
        token: store.getState().session.token
      };

      expect(actual.isAuthenticated).toEqual(session.isAuthenticated);
      expect(actual.token).toEqual(session.token);
    });
  });

  describe('Store behaviour on application error state', () => {
    it('should create valid application error state on errors.', () => {
      const store = createStore(rootReducer, initialState);
      const applicationError = {
        isInErrorState: true,
        error: {
          status: 500,
          message: 'Http error'
        }
      };

      const action = commonAction.setApplicationErrorState(applicationError);
      store.dispatch(action);

      const actual = {
        isInErrorState: store.getState().common.applicationError.isInErrorState,
        error: store.getState().common.applicationError.error
      };

      expect(actual.isInErrorState).toEqual(applicationError.isInErrorState);
      expect(actual.error).toEqual(applicationError.error);
    });

    it('should clear application error state on reset.', () => {
      const store = createStore(rootReducer, initialState);
      const applicationError = {
        isInErrorState: false,
        error: { }
      };

      const action = commonAction.setApplicationErrorState(applicationError);
      store.dispatch(action);

      const actual = {
        isInErrorState: store.getState().common.applicationError.isInErrorState,
        error: store.getState().common.applicationError.error
      };

      expect(actual.isInErrorState).toEqual(applicationError.isInErrorState);
      expect(actual.error).toEqual(applicationError.error);
    });
  });
});
