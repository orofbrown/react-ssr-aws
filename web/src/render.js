const { default: render } = require('client/build/main.server');
/** @todo - old TGZ is getting cached by Yarn for some reason and using old assets.json */
const assets = require('client/build/assets.json');

function ssr(req, res) {
  render(res, assets);
}

module.exports = ssr;
