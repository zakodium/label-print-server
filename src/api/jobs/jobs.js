'use strict';

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 */
async function jobs(fastify) {
  fastify.route(require('./getAllJobs')); // GET "/jobs"
  fastify.route(require('./postJob')); // POST "/jobs"
}

module.exports = jobs;
