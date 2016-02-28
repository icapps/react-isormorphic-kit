/**
 * Created by mobinni on 07/12/15.
 */

// Imports
import env from './utils/environment';
import express from 'express';
import {webpack as webPackCustomMiddleware, render} from './middleware';
import compression from 'compression';


const app = express();
const {isProduction, ssrEnabled, isDevelopment} = env;

export function boot() {
  // Configuration
  const port = isProduction ? process.env.PORT : 9000;


// Environment setup
  if (isDevelopment) {
    app.use(function (req, res, next) {
      if (req.url !== '/') {
        // if you're not the root url, pass throught the webpack middleware
        webPackCustomMiddleware.WebPackMiddleware(req, res, next);
      } else {
        // Will pass through a middleware to server side render index.html
        next();
      }
    });

    app.use(webPackCustomMiddleware.HotReloadMiddleware);
  }


  // Other middlewares
  app.use(compression());
  if (ssrEnabled) {
    app.use(render.route);
  } else {
    app.use(render.index);
  }

  app.listen(port, () => console.log('Server running on port ' + port));
};