const bodyParser = require('body-parser');
const cookie = require('cookie');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const clientConfig = require('../config/client.config');
const serverConfig = require('../config/server.config');
// const { createSecureDevServer } = require('./utils');

// const HTTPS_PORT = 3001;
// const WEB_HOST = process.env.WEB_HOST || 'localhost';
// const WEB_PORT = parseInt(process.env.WEB_PORT, 10) || 8181;
// const WEB_URL = `http://${WEB_HOST}:${WEB_PORT}`;
// var isBuilt = false;

const HTTP_PORT = 3000;

const app = express();

function createListeners() {
  return new Promise((resolve, reject) => {
    console.log('HERE');
    app.listen(HTTP_PORT, (error) => {
      if (error) {
        console.error('EXPRESS_CLIENT_STARTUP_ERROR', error);
        reject();
      }

      console.info(
        `HTTP CLIENT server started on http://localhost:${HTTP_PORT}`,
      );

      // createSecureDevServer(HTTP_PORT, HTTPS_PORT);

      const bodyParser = require('body-parser');
      resolve();
    });
  });
}

async function done() {
  // if (!isBuilt) {
  //   isBuilt = true;
  await createListeners();
  // }
}

function runForDev() {
  // const servicesRouter = express.Router();
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
  const clientCompiler = multiCompiler.compilers[0];
  const options = {
    publicPath: '',
    serverSideRender: true,
    writeToDisk: true,
  };

  app.use(webpackDevMiddleware(multiCompiler, options));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(multiCompiler));

  clientCompiler.hooks.done.tap('done', done);
}

module.exports = runForDev;
