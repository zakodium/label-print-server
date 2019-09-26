'use strict';

const server = require('./fastify');
const env = require('./env');

server.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Label print server',
      description: 'Print labels using an HTTP API',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});

require('./api')(server);

async function start() {
  try {
    await server.listen(env.NODE_PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
