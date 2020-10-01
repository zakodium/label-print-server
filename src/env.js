'use strict';

const envalid = require('envalid');

const validators = {
  LOG_LEVEL: envalid.str({
    choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
  }),
  MONGODB_DATABASE: envalid.str(),
  MONGODB_URL: envalid.url(),
  NODE_PORT: envalid.port({ default: 3000 }),
  PRINT_JOB_DELAY: envalid.num({ default: 500 }),
  STATUS_CHECK_DELAY: envalid.num({ default: 10000 }),
};

module.exports = envalid.cleanEnv(process.env, validators, {
  strict: true,
});
