'use strict';

const fastify = require('../fastify');
const { updateAllStatuses } = require('../printer/status');

const createWorker = require('./create');

createWorker(
  async () => {
    fastify.log.trace('Update all printer statuses');
    await updateAllStatuses();
  },
  { delay: 10000 },
);
