'use strict';

const server = require('./fastify');
const { printNextJob } = require('./printer/print');

server.ready().then(async () => {
  try {
    await printNextJob();
    await server.close();
  } catch (err) {
    server.log.error({ err });
    process.exit(1);
  }
});
