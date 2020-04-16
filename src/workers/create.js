'use strict';

/* eslint-disable no-await-in-loop */

const fastify = require('../fastify');

const delay = require('./delay');

function createWorker(work, options) {
  fastify
    .ready()
    .then(async () => {
      while (true) {
        await work();
        await delay(options.delay);
      }
    })
    .catch(async (err) => {
      fastify.log.error(err);
      // Give enough time for the log to be printed.
      await delay(1000);
      process.exit(1);
    });
}

module.exports = createWorker;
