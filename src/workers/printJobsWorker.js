'use strict';

const fastify = require('../fastify');
const { printNextJob } = require('../printer/print');

const createWorker = require('./create');

createWorker(
  async () => {
    fastify.log.trace('Handle pending jobs');
    // eslint-disable-next-line no-await-in-loop
    while (await printNextJob());
  },
  { delay: 500 },
);
