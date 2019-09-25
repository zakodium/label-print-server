'use strict';

/**
 *
 * @param {import('fastify').FastifyInstance} server
 */
function registerRoutes(server) {
  server.register(require('./labels/labels'));
  server.register(require('./printers/printers'));
}

module.exports = registerRoutes;
