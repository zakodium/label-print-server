'use strict';

/* eslint-disable no-await-in-loop */

const fastify = require('../fastify');
const { printNextJob } = require('../printer/print');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function work() {
  while (true) {
    fastify.log.trace('handle pending jobs');
    while (await printNextJob());
    await delay(500);
  }
}

fastify
  .ready()
  .then(work)
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
