'use strict';

const fastify = require('./fastify');
const env = require('./env');
const startWorker = require('./workers/start');

require('./api')(fastify);

async function start() {
  try {
    await fastify.listen(env.NODE_PORT, '0.0.0.0');
    startWorker('printJobs');
    startWorker('printerStatus');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
