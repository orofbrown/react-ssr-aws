function createSecureDevServer(httpPort, httpsPort) {
  try {
    const privateKey = fs.readFileSync(
      path.resolve(__dirname, './certs/self-signed-server.key'),
      'utf8',
    );
    const certificate = fs.readFileSync(
      path.resolve(__dirname, './certs/self-signed-server.crt'),
      'utf8',
    );
    httpProxy
      .createServer({
        target: { host: 'localhost', port: httpPort },
        ssl: { key: privateKey, cert: certificate },
      })
      .listen(httpsPort);
  } catch (error) {
    console.warn(
      `\nFailed to start secure web server. You can still access localhost:${httpPort}. If you wish to have an HTTPS server, executed 'npm run mkcert'\n`,
    );
  }
}

module.exports = {
  createSecureDevServer,
};
