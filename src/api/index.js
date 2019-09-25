'use strict';

/**
 *
 * @param {import('fastify').FastifyInstance} server
 */
function registerRoutes(server) {
  server.register(require('./jobs/jobs'));
  server.register(require('./printers/printers'));
}

module.exports = registerRoutes;
