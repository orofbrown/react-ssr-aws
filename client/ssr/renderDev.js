import render from './render';

function renderDev(webpackStats) {
  return (req, res, next) => {
    const { path } = req;

    if (path === '/favicon.ico') {
      return next();
    }

    const hydrate = render(webpackStats);
    hydrate(res);
  };
}

export default renderDev;
