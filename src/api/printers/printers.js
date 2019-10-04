'use strict';

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 */
async function printers(fastify) {
  fastify.route(require('./getAllPrinters')); // GET "/printers"
  fastify.route(require('./getPrinter')); // GET "/printers/:id"
  fastify.route(require('./createPrinter')); // POST "/printers"
  fastify.route(require('./getPrinterStatus')); // POST "/printer/:id/status"
  fastify.route(require('./deletePrinter')); // DELETE "/printer/:id"
}

module.exports = printers;
