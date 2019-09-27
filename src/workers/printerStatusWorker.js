'use strict';

/* eslint-disable no-await-in-loop */

const fastify = require('../fastify');
const { updateAllStatuses } = require('../printer/status');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function work() {
  while (true) {
    fastify.log.trace('Update all printer statuses');
    await updateAllStatuses();
    await delay(10000);
  }
}

fastify
  .ready()
  .then(work)
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
