const { renderHTML } = require('client/build/main').client;

function render(req, res) {
  const html = renderHTML();
  res.status(200).send(html);
}

module.exports = render;
