// const fs = require('fs');
// const path = require('path');

// const INDEX_HTML_PATH = path.resolve(__dirname, '../public/index.html');

function renderDev({ clientStats, serverStats }) {
  return (req, res, next) => {
    const { path } = req;

    if (path === '/favicon.ico') {
      return next();
    }

    res.send(`<html>
  <body>
    Hello From Render Middleware
  </body>
</html>`);
  };
}

export default renderDev;
