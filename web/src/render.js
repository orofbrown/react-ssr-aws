const { default: getResponseStream } = require('client/build/main');

function render(req, res) {
  const hydrate = getResponseStream();
  res.status(200).send(hydrate(res));
}

module.exports = render;
