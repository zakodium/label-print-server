'use strict';

const path = require('path');
const { Worker } = require('worker_threads');

const fastify = require('./fastify');

function startWorker(name) {
  const workerFile = path.join(__dirname, 'workers', `${name}Worker.js`);
  instantiateWorker(name, workerFile);
}

function instantiateWorker(name, workerFile) {
  fastify.log.info(`Starting worker ${name}`);
  const worker = new Worker(workerFile);
  worker.on('error', (error) => {
    fastify.log.error(`Worker error: ${error}`);
  });
  worker.on('exit', () => {
    fastify.log.error(`Worker ${name} was terminated`);
    instantiateWorker(name, workerFile);
  });
}

module.exports = startWorker;
