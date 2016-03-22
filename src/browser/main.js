import 'babel-polyfill';
import Bluebird from 'bluebird';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../common/configureStore';
import createEngine from 'redux-storage-engine-localstorage';
import createRoutes from './createRoutes';
import en from 'react-intl/locale-data/en';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { addLocaleData } from 'react-intl';
import { browserHistory, hashHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

// http://bluebirdjs.com/docs/why-bluebird.html
window.Promise = Bluebird;

// github.com/yahoo/react-intl/wiki/Upgrade-Guide#add-call-to-addlocaledata-in-browser
[en/* , ro, ru */].forEach(addLocaleData);

const isServerless = process.env.IS_SERVERLESS;

const history = isServerless ? hashHistory : browserHistory;
const store = configureStore({
  createEngine,
  initialState: window.__INITIAL_STATE__,
  platformMiddleware: [routerMiddleware(history)]
});

const syncedHistory = syncHistoryWithStore(history, store);
const routes = createRoutes(store.getState);


document.addEventListener('DOMContentLoaded', () => {
  require('fastclick').attach(document.body);
}, false);

ReactDOM.render(
  <Provider store={store}>
    <Router history={syncedHistory} routes={routes} />
  </Provider>
  , document.getElementById('app')
);
