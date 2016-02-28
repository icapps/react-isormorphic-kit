/**
 * Created by mobinni on 08/12/15.
 */
import webpackMw from './webpack';
import { match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import env from '../utils/environment';
import {renderEngine, renderIndex as renderStatic} from '../engines';
import routes from '../../app/scripts/routes';
import {initialise} from '../../app/lib';

const {store, modules, middlewares} = initialise([]);

const query = (file, callback) => {
  if (!env.isProduction) {
    webpackMw.query(file, function (err, body) {
      callback(err, body);
    });
  } else {
    // production read file from...
    callback(null, null);
  }
};

// Router middleware
function route(req, res, next) {
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
          body,
          store
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

function index(req, res, next) {
  renderStatic(function (data) {
    res.status(200).send(data);
  })
}

export default {
  route,
  index
}