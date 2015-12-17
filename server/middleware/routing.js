/**
 * Created by mobinni on 08/12/15.
 */
import webpack from './webpack';
import { match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import {env} from '../utils';
import {renderEngine} from '../engines';
import routes from '../../app/scripts/routes';

const query = (file, callback) => {
    if (!env.isProduction) {
        webpack.query(file, function (err, body) {
            callback(err, body);
        });
    } else {
        // production read file from...
        callback(null, null);
    }
};

// Router middleware
export default (req, res, next) => {
    query('index.html', function (err, body) {
        let location = createLocation(req.url);
        match({routes, location}, (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message);
            } else if (redirectLocation) {
                res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
                renderEngine(
                    renderProps,
                    body
                ).then(function (html) {
                    res.status(200).send(html);
                }, function (error2) {
                    console.error('failed to load', error2);
                    res.status(500).send(JSON.stringify(error2));
                });
            } else {
                res.status(404).send();
            }
        });
    });
};
