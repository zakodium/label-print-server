'use strict';

const uuid = require('uuid/v4');

const {
  manufacturerSchema,
  printerSchema,
  serviceSchema,
  string,
} = require('./schemas');

/**
 * @type import('fastify').RouteOptions
 */
const createPrinter = {
  method: 'POST',
  url: '/printers',
  schema: {
    body: {
      type: 'object',
      properties: {
        name: string,
        description: string,
        manufacturer: manufacturerSchema,
        service: serviceSchema,
        address: string,
      },
      required: ['name', 'description', 'manufacturer', 'service', 'address'],
    },
    response: {
      200: printerSchema,
    },
  },
  async handler(request) {
    const printers = this.mongo.db.collection('printers');
    const printer = {
      _id: uuid(),
      ...request.body,
      status: 'UNKNOWN',
    };
    await printers.insertOne(printer);
    return printer;
  },
};

module.exports = createPrinter;
