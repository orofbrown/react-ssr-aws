function ProductInformationMiddleware(req, res) {
  console.log('ProductInformationMiddleware');

  res.sendStatus(200);
}

module.exports = ProductInformationMiddleware;
