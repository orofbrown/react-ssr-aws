import hydrate from './hydrate';
import App from '../src/App';

export function renderProd(webpackStats = {}) {
  return hydrate(App, webpackStats);
}

export default renderProd;
