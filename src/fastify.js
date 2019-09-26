'use strict';

const createFastify = require('fastify');

const env = require('./env');

const fastify = createFastify({
  logger: {
    prettyPrint: env.isDevelopment,
  },
  trustProxy: true,
});

fastify.register(require('fastify-mongodb'), {
  url: env.MONGODB_URL,
  database: env.MONGODB_DATABASE,
  autoReconnect: true,
});

module.exports = fastify;
