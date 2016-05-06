'use strict';
/**
 * Created by mobinni on 07/12/15.
 */
 
require.extensions['.scss'] = function() {
    return;
};

// compile ES6 to 5
require('babel-register')();

/**
 * Environment configuration
 */
delete process.env.BROWSER;

if (!process.env.hasOwnProperty('feature')) {
  process.env.feature = {};
}

const server = require('./server.js');

server.boot();
