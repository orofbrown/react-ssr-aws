import render from './render';

const { ASSETS_HOST } = process.env;

function renderDev(webpackStats) {
  return (req, res, next) => {
    const { path } = req;

    if (path === '/favicon.ico') {
      return next();
    }

    const { clientStats, serverStats } = webpackStats;
    const assets = [...clientStats.assets, ...serverStats.assets].map(
      (a) => `${ASSETS_HOST}/${a.name}`,
    );

    render(res, assets);
  };
}

export default renderDev;
