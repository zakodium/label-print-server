'use strict';

/**
 *
 * @param {import('fastify').FastifyInstance} server
 */
async function labels(server) {
  server.get('/', async () => {
    return { hello: 'world' };
  });
}

module.exports = labels;
