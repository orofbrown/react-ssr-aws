import React, { useEffect } from 'react';

/*
  <script src="static/js/runtime.bundle.js"></script>
  <script src="static/js/vendors-node_modules_mini-css-extract-plugin_dist_hmr_hotModuleReplacement_js-node_modules_re-ea7ca5.bundle.js"></script>
  <script src="static/js/main.bundle.js"></script>
  <link rel="stylesheet" href="static/css/main.css" />
*/
function insertAssets(assets) {
  if (!assets) {
    // Already loaded and we're in client render
    return;
  }

  const assetTags = assets
    .map((ass, index) => {
      if (!ass.includes('static/')) {
        return '';
      } else if (ass.endsWith('.js')) {
        return <script key={index} src={ass}></script>;
        // return `<script src="${ass}"></script>`;
      } else if (ass.endsWith('.css')) {
        // return `<link rel="stylesheet" href="${ass}" />`;
        return <link key={index} rel="stylesheet" href={ass} />;
      }

      return '';
    })
    .filter(Boolean);

  return <>{assetTags.map((a) => a)}</>;
}

/** Official React CodeSandbox example
 * @link {https://github.com/reactwg/react-18/discussions/22}
 * @link {https://codesandbox.io/s/kind-sammet-j56ro}
 */
function Html({ assets, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta name="theme-color" contents="#ffffff" />
        <link rel="icon" href="favicon.ico" />
        <title>React SSR AWS Experiment</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        {children}
        {/* <div dangerouslySetInnerHTML={{ __html: insertAssets(assets) }} /> */}
        {insertAssets(assets)}
      </body>
    </html>
  );
}

export default Html;
