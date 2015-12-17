'use strict';
/**
 * Created by mobinni on 07/12/15.
 */
require("babel/register")({
    ignore: /node_modules/
});

// Browser variable declaration should be ignored by server
delete process.env.BROWSER;

// Imports
const utils = require('./utils'),
    express = require('express'),
    webPackCustomMiddleware = require('./middleware').webpack,
    router = require('./middleware').router,
    compression = require('compression'),
    app = express();

// Configuration
const port = utils.env.isProduction ? process.env.PORT : 9000;

// Environment setup
if (utils.env.isDevelopment) {
    // turn this line off to turn off SSR updates
    if (!require("piping")({hook: true, includeModules: false })) { return; }

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
app.use(router);

app.listen(port, () => console.log('Server running on port ' + port));
