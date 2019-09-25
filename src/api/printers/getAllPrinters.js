'use strict';

const { printerSchema } = require('./schemas');

/**
 * @type import('fastify').RouteOptions
 */
const getAllPrinters = {
  method: 'GET',
  url: '/printers',
  schema: {
    response: {
      200: {
        type: 'array',
        items: printerSchema,
      },
    },
  },
  async handler() {
    const printers = this.mongo.db.collection('printers');
    const result = await printers.find({}).toArray();
    return result;
  },
};

module.exports = getAllPrinters;
