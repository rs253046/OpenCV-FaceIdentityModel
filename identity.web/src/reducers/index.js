import { combineReducers } from 'redux';
import dashboard from './dashboardReducer';
import session from './sessionReducer';
import common from './commonReducer';
import locale from './localeReducer';
import registration from './registrationReducer';

const rootReducer = combineReducers({
  session,
  dashboard,
  locale,
  common,
  registration
});

export default rootReducer;
