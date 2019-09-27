'use strict';

const envalid = require('envalid');

const validators = {
  LOG_LEVEL: envalid.str({
    choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
  }),
  MONGODB_DATABASE: envalid.str(),
  MONGODB_URL: envalid.url(),
  NODE_PORT: envalid.port({ default: 3000 }),
};

// eslint-disable-next-line no-process-env
module.exports = envalid.cleanEnv(process.env, validators, {
  strict: true,
});
