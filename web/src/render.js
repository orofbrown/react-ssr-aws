const { default: renderUI } = require('client/build/main');

function render(req, res) {
  const html = renderUI();
  res.status(200).send(html);
}

module.exports = render;
