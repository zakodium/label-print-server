'use strict';

const fastify = require('fastify');

const env = require('./env');

const server = fastify({
  logger: {
    prettyPrint: env.isDevelopment,
  },
});

server.register(require('fastify-mongodb'), {
  url: env.MONGODB_URL,
  database: env.MONGODB_DATABASE,
  autoReconnect: true,
});
require('./routes')(server);

async function start() {
  try {
    await server.listen(env.NODE_PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
