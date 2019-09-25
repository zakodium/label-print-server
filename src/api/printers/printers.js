'use strict';

/**
 *
 * @param {import('fastify').FastifyInstance} server
 */
async function printers(server) {
  server.route(require('./getAllPrinters')); // GET "/printers"
  server.route(require('./getPrinter')); // GET "/printers/:id"
  server.route(require('./createPrinter')); // POST "/printers"
  server.route(require('./getPrinterStatus')); // POST "/printer/:id/status"
}

module.exports = printers;
