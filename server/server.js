/**
 * Created by mobinni on 07/12/15.
 */

// Browser variable declaration should be ignored by server
delete process.env.BROWSER;

// Imports
import 'babel-polyfill';
import env from './utils/environment';
import express from 'express';
import {webpack as webPackCustomMiddleware, router, renderIndex} from './middleware';
import compression from 'compression';

const app = express();
const {isProduction, ssrEnabled, isDevelopment} = env;

export function boot() {
    // Configuration
    const port = isProduction ? process.env.PORT : 9000;


// Environment setup
    if (isDevelopment) {

        // turn this line off to turn off SSR updates
        if (ssrEnabled) {
            if (!require("piping")({hook: true, includeModules: false})) {
                return;
            }
        }

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
    if(ssrEnabled) {
        app.use(router);
    } else {
        app.use(renderIndex);
    }

    app.listen(port, () => console.log('Server running on port ' + port));
};