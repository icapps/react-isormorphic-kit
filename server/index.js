'use strict';
/**
 * Created by mobinni on 07/12/15.
 */
require('babel-register')({
    ignore: /node_modules|\.css?&|\.scss?&/
});

/**
 * Environment configuration
 */
delete process.env.BROWSER;

if (!process.env.hasOwnProperty('feature')) {
  process.env.feature = {};
}

const server = require('./server.js');

server.boot();
