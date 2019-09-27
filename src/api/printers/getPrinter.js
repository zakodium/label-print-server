'use strict';

const { printerSchema } = require('./schemas');

/**
 * @type import('fastify').RouteOptions
 */
const getPrinter = {
  method: 'GET',
  url: '/printers/:id',
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    response: {
      200: printerSchema,
    },
  },
  async handler(request, response) {
    const printers = this.mongo.db.collection('printers');
    const printer = await printers.findOne({ _id: request.params.id });
    if (!printer) return response.callNotFound();
    return printer;
  },
};

module.exports = getPrinter;
