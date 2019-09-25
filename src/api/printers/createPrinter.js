'use strict';

const uuid = require('uuid/v4');

const { getStatus } = require('../../printer/status');

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
  async handler(request, response) {
    const printers = this.mongo.db.collection('printers');
    const printerStatus = await getStatus(printer);
    if (
      printerStatus.status !== 'UNKNOWN' ||
      printerStatus.status === 'UNAVAILABLE'
    ) {
      return response
        .status(404)
        .send({ error: 'could not communicate with the printer' });
    }
    const printer = {
      _id: uuid(),
      ...request.body,
      status: printerStatus.status,
    };
    await printers.insertOne(printer);
    return printer;
  },
};

module.exports = createPrinter;
