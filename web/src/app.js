const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const router = require('./router');

const app = express();

app.enable('trust proxy');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '500kb' }));

app.use(cookieParser());

app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.referrerPolicy({ policy: 'origin-when-cross-origin' }));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'default-src': helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
      /** @TODO - dynamic */
      'script-src': ["'self'", 'localhost:8000'],
      'frame-ancestors': ["'self'"],
    },
  }),
);
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: false }));

app.use('/', router);

module.exports = app;
