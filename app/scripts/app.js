// Import default Styles
import '../styles/general/styles.scss';

// Import Modules
import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Router from 'react-router';
import routes from './routes';
import {initialise} from '../lib';
import createLogger from 'redux-logger';
import {Provider} from 'react-redux';

const history = createBrowserHistory();


const {store, modules, middlewares} = initialise([createLogger()]);

if (process.env.feature.DEV) {
  window.__STORE__ = store;
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}
            routes={routes}/>
  </Provider>,
  document.getElementById('root')
);