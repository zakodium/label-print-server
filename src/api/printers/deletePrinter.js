'use strict';

const { printerSchema } = require('./schemas');

/**
 * @type import('fastify').RouteOptions
 */
const deletePrinter = {
  method: 'DELETE',
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
      200: {
        type: 'object',
        properties: {
          deleted: { type: 'boolean' },
        },
        required: ['deleted'],
      },
    },
  },
  async handler(request, response) {
    const printers = this.mongo.db.collection('printers');
    const result = await printers.findOneAndDelete({
      _id: request.params.id,
    });
    if (!result.value) return response.callNotFound();
    return { deleted: true };
  },
};

module.exports = deletePrinter;
