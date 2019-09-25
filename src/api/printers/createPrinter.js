'use strict';

const uuid = require('uuid/v4');

const { getStatus } = require('../../printer/status');

const {
  manufacturerSchema,
  printerSchema,
  serviceSchema,
  stringSchema,
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
        name: stringSchema,
        description: stringSchema,
        manufacturer: manufacturerSchema,
        service: serviceSchema,
        address: stringSchema,
      },
      required: ['name', 'description', 'manufacturer', 'service', 'address'],
    },
    response: {
      200: printerSchema,
    },
  },
  async handler(request, response) {
    const printers = this.mongo.db.collection('printers');
    const printer = {
      _id: uuid(),
      ...request.body,
    };
    const printerStatus = await getStatus(printer);
    if (
      printerStatus.status !== 'UNKNOWN' ||
      printerStatus.status === 'UNAVAILABLE'
    ) {
      return response
        .status(404)
        .send({ error: 'could not communicate with the printer' });
    }
    printer.status = printerStatus.status;
    printer.statusReason = printerStatus.reason;
    await printers.insertOne(printer);
    return printer;
  },
};

module.exports = createPrinter;
