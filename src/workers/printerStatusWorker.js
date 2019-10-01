'use strict';

const env = require('../env');
const fastify = require('../fastify');
const { updateAllStatuses } = require('../printer/status');

const createWorker = require('./create');

createWorker(
  async () => {
    fastify.log.trace('Update all printer statuses');
    await updateAllStatuses();
  },
  { delay: env.STATUS_CHECK_DELAY },
);
