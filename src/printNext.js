'use strict';

const fastify = require('./fastify');
const { printNextJob } = require('./printer/print');

fastify.ready().then(async () => {
  try {
    await printNextJob();
    await fastify.close();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
