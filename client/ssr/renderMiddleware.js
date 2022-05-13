import * as fs from 'fs';
import * as path from 'path';

const INDEX_HTML_PATH = path.resolve(__dirname, '../public/index.html');

function renderMiddleware() {
  return (req, res) => {
    /** @TODO - temporary */
    const HTML = fs.readFileSync(INDEX_HTML_PATH, { encoding: 'utf-8' });
    res.send(HTML);
  };
}

export default renderMiddleware;
