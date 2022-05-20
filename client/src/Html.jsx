import React from 'react';

/*
  <script src="static/js/runtime.bundle.js"></script>
  <script src="static/js/vendors-node_modules_mini-css-extract-plugin_dist_hmr_hotModuleReplacement_js-node_modules_re-ea7ca5.bundle.js"></script>
  <script src="static/js/main.bundle.js"></script>
  <link rel="stylesheet" href="static/css/index.css" />
*/
function Assets({ assets }) {
  if (!assets) {
    // Already loaded and we're in client render
    return null;
  }

  const result = (
    <>
      {assets
        .map((ass) => {
          const key = ass.split('/')[0];

          if (!ass.startsWith('static/')) {
            return '';
          } else if (ass.endsWith('.js')) {
            return <script key={key} src={ass}></script>;
          } else if (ass.endsWith('.css')) {
            return <link key={key} rel="stylesheet" href={ass} />;
          }

          return '';
        })
        .filter(Boolean)}
    </>
  );

  return result;
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
        <Assets assets={assets} />
      </body>
    </html>
  );
}

export default Html;
