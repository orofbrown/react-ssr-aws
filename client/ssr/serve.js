const bodyParser = require('body-parser');
const cookie = require('cookie');
const express = require('express');
const httpProxy = require('http-proxy');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const clientConfig = require('../config/client.config');
const serverConfig = require('../config/server.config');
// const { createSecureDevServer } = require('./utils');

/** @TODO - setup nginx server */

// const HTTPS_PORT = 3001;
// const WEB_HOST = process.env.WEB_HOST || 'localhost';
// const WEB_PORT = parseInt(process.env.WEB_PORT, 10) || 8181;
// const WEB_URL = `http://${WEB_HOST}:${WEB_PORT}`;
var isBuilt = false;

const HTTP_PORT = 3000;

const app = express();
const proxy = httpProxy.createProxyServer();

function createListeners() {
  return new Promise((resolve, reject) => {
    app.listen(HTTP_PORT, (error) => {
      if (error) {
        console.error('EXPRESS_CLIENT_STARTUP_ERROR', error);
        reject();
      }

      console.info(
        `HTTP development server started on http://localhost:${HTTP_PORT}`,
      );

      // createSecureDevServer(HTTP_PORT, HTTPS_PORT);

      resolve();
    });
  });
}

async function done(...args) {
  // console.log('DONE');
  if (!isBuilt) {
    isBuilt = true;
    await createListeners();
  }
}

function proxyToWeb(req, res) {
  proxy;
}

function runForDev() {
  const servicesRouter = express.Router();
  /** @todo - proxyToWeb */

  app.use(bodyParser.json());
  app.use((req, _, next) => {
    if (req.cookies) {
      return next();
    }

    try {
      req.cookies = cookie.parse(req.headers.cookie);
    } catch (error) {
      req.cookies = {};
    }

    return next();
  });

  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers.find(
    (x) => x.name === 'client',
  );

  const options = {
    publicPath: '',
    serverSideRender: true,
    writeToDisk: true,
  };

  app.use(webpackDevMiddleware(multiCompiler, options));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(multiCompiler));

  multiCompiler.hooks.done.tap('done', done);
}

module.exports = runForDev;
