import WebPack from 'webpack';
import path from 'path';
import fs from 'fs';
import env from '../utils/environment';
import {StringDecoder} from 'string_decoder';
import webpackDevMiddleware from 'webpack-dev-middleware';
import HotReload from 'webpack-hot-middleware';
import chokidar from 'chokidar';

let webpackConfig = require(
  `${__dirname}/../../webpack/webpack.${env.isProduction ? 'prod' : 'dev'}.js`
);

let bundleStart = null;
let compiler = WebPack(webpackConfig);

let requests = [];
let webpackFs;

let decoder = new StringDecoder('utf8');

// Webpack starts bundling
compiler.plugin('compile', function () {
  bundleStart = Date.now();
});

var watcher = chokidar.watch(__dirname + '/../server');

watcher.on('ready', function () {
  watcher.on('all', function () {
    console.log("Clearing /server/ module cache from server");
    Object.keys(require.cache).forEach(function (id) {
      if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
    });
  });
});

// Webpack is done compiling
compiler.plugin('done', function () {
  console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');

  webpackFs = compiler.outputFileSystem;
  processRequests();

  Object.keys(require.cache).forEach(function (id) {
    if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
  });
});

const WebPackMiddleware = webpackDevMiddleware(compiler, {
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  hot: true,
  colors: true,
  headers: {'X-Webpack-Rendered': 'yes'}
});

const query = function (path, cb) {
  requests.push({path, cb});
  processRequests();
};


const HotReloadMiddleware = HotReload(compiler);

function processRequests() {
  if (!webpackFs) {
    return;
  }

  let req = requests.pop();

  if (!req) {
    return;
  }

  webpackFs.readFile(webpackConfig.output.path + '/' + req.path, function (err, data) {
    req.cb(err, decoder.write(data));
  });

  processRequests();
}

export {
  WebPackMiddleware,
  query,
  HotReloadMiddleware
}

export default {
  WebPackMiddleware,
  query,
  HotReloadMiddleware
}
