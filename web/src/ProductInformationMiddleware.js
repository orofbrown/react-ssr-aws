const render = require('./render');

function ProductInformationMiddleware(req, res) {
  render(req, res);
}

module.exports = ProductInformationMiddleware;
