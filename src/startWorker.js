'use strict';

const path = require('path');
const { Worker } = require('worker_threads');

const fastify = require('./fastify');

function startWorker(name) {
  const workerFile = path.join(__dirname, 'workers', `${name}Worker.js`);
  instantiateWorker(name, workerFile);
}

function instantiateWorker(name, workerFile) {
  fastify.log.info(`starting worker ${name}`);
  const worker = new Worker(workerFile);
  worker.on('exit', () => {
    fastify.log.error(`worker ${name} was terminated`);
    instantiateWorker(name, workerFile);
  });
}

module.exports = startWorker;
