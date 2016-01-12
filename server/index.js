'use strict';
/**
 * Created by mobinni on 07/12/15.
 */
require('babel-register')({
    ignore: /node_modules|\.css?&|\.scss?&/
});

const server = require('./server.js');
server.boot();
