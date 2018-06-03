import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_ru from 'react-intl/locale-data/ru';
import { sessionAction } from './actions';
import 'bootstrap/dist/css/bootstrap.min.css';

addLocaleData([...locale_en, ...locale_ru]);

const store = configureStore();
store.dispatch(sessionAction.restoreSession());

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
