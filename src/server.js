'use strict';

const fastify = require('./fastify');
const env = require('./env');
const startWorker = require('./startWorker');

fastify.register(require('fastify-swagger'), {
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

require('./api')(fastify);

async function start() {
  try {
    await fastify.listen(env.NODE_PORT);
    startWorker('printJobs');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
