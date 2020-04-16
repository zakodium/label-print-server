'use strict';

const env = require('../env');
const fastify = require('../fastify');
const { printNextJob } = require('../printer/print');

const createWorker = require('./create');
const delay = require('./delay');

createWorker(
  async () => {
    fastify.log.trace('Handle pending jobs');
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      await printNextJob();
      // eslint-disable-next-line no-await-in-loop
      await delay(100);
    }
  },
  { delay: env.PRINT_JOB_DELAY },
);
