'use strict';

const fastify = require('fastify');

const env = require('./env');

const server = fastify({
  logger: {
    prettyPrint: env.isDevelopment,
  },
  trustProxy: true,
});

server.register(require('fastify-mongodb'), {
  url: env.MONGODB_URL,
  database: env.MONGODB_DATABASE,
  autoReconnect: true,
});

module.exports = server;
