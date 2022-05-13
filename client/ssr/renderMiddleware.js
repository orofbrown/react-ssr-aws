// const fs = require('fs');
// const path = require('path');

// const INDEX_HTML_PATH = path.resolve(__dirname, '../public/index.html');

function renderMiddleware() {
  return (req, res) => {
    console.log('HERE');
    res
      .status(200)
      .send('<html><body>Hello From the Server Side</body></html>');
  };
}

export default renderMiddleware;
