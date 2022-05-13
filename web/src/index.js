const express = require('express');
const nodeHttp = require('http');
const app = require('./app');
const config = require('./config');

app.use(express.static('../static-assets'));

const httpServer = nodeHttp.createServer(app);

httpServer.on('clientError', (error, socket) => {
  const { code, reason } = error;
  console.error('NODE_CLIENT_ERROR', `${code}-${reason}`);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

httpServer.listen(config.port, (error) => {
  if (error) {
    console.error('EXPRESS_WEB_STARTUP_ERROR', error);
    process.exit(1);
  } else {
    console.info(`HTTP WEB server started on ${config.host}:${config.port}`);
  }
});
