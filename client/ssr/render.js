import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from '../src/App';

const defaultAssets = [
  'static/js/runtime.bundle.js',
  'static/js/186.client.js',
  'static/js/main.client.js',
  'static/css/main.css',
];

function render(expressResponse, assets) {
  let didError = false;
  const assetsToUse = assets || defaultAssets;
  const responseStream = renderToPipeableStream(<App assets={assetsToUse} />, {
    // "shell" refers to the base page being sent to the browser
    onShellReady() {
      // The content above all Suspense boundaries is ready.
      // If something errored before we started streaming, we set the error code appropriately.
      expressResponse.statusCode = didError ? 500 : 200;
      expressResponse.setHeader('Content-Type', 'text/html');
      responseStream.pipe(expressResponse);
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
}

export default render;
