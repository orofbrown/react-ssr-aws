process.env.NODE_ENV = 'production';

const { execSync } = require('child_process');
const { rmSync, writeFileSync } = require('fs');
const path = require('path');
const webpack = require('webpack');
const clientConfig = require('../config/client.config');
const serverConfig = require('../config/server.config');

const { ASSETS_HOST } = process.env;

function buildForDeploy() {
  console.log('Build started...');

  rmSync(path.resolve(__dirname, '../build'), {
    force: true,
    recursive: true,
  });

  const webpackConfigs = [clientConfig, serverConfig];

  return webpack(webpackConfigs, (error, stats) => {
    if (error) {
      const { stack, details } = error;
      console.error(stack, details);
      process.exit(1);
    }

    const { errors, warnings } = stats.toJson();
    if (stats.hasErrors()) {
      console.error(errors);
      process.exit(1);
    } else if (stats.hasWarnings()) {
      console.warn(warnings);
    }
  });
}

async function main() {
  const {
    compilers: [clientCompiler, serverCompiler],
  } = buildForDeploy();

  const clientPromise = new Promise((resolve) => {
    clientCompiler.hooks.done.tap('done', (stats) => {
      const { assets } = stats.toJson();
      console.log('Client Done.');
      resolve(assets.map((asset) => asset.name));
    });
  });

  serverCompiler.hooks.done.tap('done', () => {
    console.log('Server Done.');
  });

  const result = await clientPromise;
  const assetsWithFullUrl = result.map((asset) => `${ASSETS_HOST}/${asset}`);
  console.log('here', assetsWithFullUrl);

  writeFileSync(
    path.resolve(__dirname, '../build/assets.json'),
    JSON.stringify(assetsWithFullUrl),
  );

  execSync('npm pack');

  process.exit(0);
}

main();
