'use strict';

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 */
function registerRoutes(fastify) {
  fastify.register(require('./jobs/jobs'));
  fastify.register(require('./printers/printers'));
}

module.exports = registerRoutes;
