'use strict';

/**
 *
 * @param {import('fastify').FastifyInstance} server
 */
async function jobs(server) {
  server.route(require('./getAllJobs')); // GET "/jobs"
  server.route(require('./postJob')); // POST "/jobs"
}

module.exports = jobs;
