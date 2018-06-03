import { combineReducers } from 'redux';
import dashboard from './dashboardReducer';
import session from './sessionReducer';
import common from './commonReducer';
import locale from './localeReducer';

const rootReducer = combineReducers({
  session,
  dashboard,
  locale,
  common
});

export default rootReducer;
