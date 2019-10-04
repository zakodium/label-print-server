'use strict';

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 */
async function jobs(fastify) {
  fastify.route(require('./getJobs')); // GET "/jobs"
  fastify.route(require('./getJob')); // GET "/jobs/:id"
  fastify.route(require('./updateJob')); // POST "/jobs/:id/update"
  fastify.route(require('./postJob')); // POST "/jobs"
}

module.exports = jobs;
