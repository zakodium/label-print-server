'use strict';

require('make-promises-safe');

const createFastify = require('fastify');

const env = require('./env');

const fastify = createFastify({
  logger: {
    level: env.LOG_LEVEL,
    prettyPrint: env.isDevelopment
      ? {
          // Force colorize in worker threads
          colorize: true,
        }
      : false,
  },
  trustProxy: true,
});

fastify.register(require('fastify-mongodb'), {
  url: env.MONGODB_URL,
  database: env.MONGODB_DATABASE,
});

module.exports = fastify;
