const webpack = require('webpack');
const clientConfig = require('../config/client.config');
const serverConfig = require('../config/server.config');

function buildForDeploy() {
  console.log('Build started...');

  const webpackConfigs = [clientConfig, serverConfig];

  return webpack(webpackConfigs, (error, stats) => {
    if (error) {
      const { stack, details } = error;
      console.error(stack, details);
      process.exit(1);
    }

    const logOutput = stats.toJson();
    if (stats.hasErrors()) {
      console.error(logOutput.errors);
      process.exit(1);
    } else if (stats.hasWarnings()) {
      console.warn(logOutput.warnings);
    }
  });
}

module.exports = buildForDeploy;
