import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';

function hydrate(App, webpackStats) {
  const { clientStats, serverStats } = webpackStats;
  const assets = [...clientStats.assets, ...serverStats.assets].map(
    (a) => a.name,
  );
  console.log({ assets });

  let didError = false;

  return (expressResponse) => {
    const stream = renderToPipeableStream(<App assets={assets} />, {
      // "shell" refers to the base page being sent to the browser
      onShellReady() {
        // The content above all Suspense boundaries is ready.
        // If something errored before we started streaming, we set the error code appropriately.
        expressResponse.statusCode = didError ? 500 : 200;
        expressResponse.setHeader('Content-Type', 'text/html');

        stream.pipe(expressResponse);
      },
      onShellError(error) {
        // Something errored before we could complete the shell so we emit an alternative shell.
        console.error('onShellError', error);
        expressResponse.status = 500;
        expressResponse.send(
          '<!doctype html><html><body><p style="color: red;">Error loading page</p></body></html>',
        );
      },
      onError(error) {
        didError = true;
        console.error('onError', error);
      },
    });

    // return stream;
  };
}

export default hydrate;
