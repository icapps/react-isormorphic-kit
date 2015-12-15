// Import default Styles
import '../styles/general/styles.scss';

// Import Modules
import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Router from 'react-router';
import routes from './routes';

const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}
            routes={routes}/>,
    document.getElementById('root')
);