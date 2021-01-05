'use strict';

const { checkStatusAvailable } = require('../../printer/status');

const { stringSchema, protocolSchema, printerSchema } = require('./schemas');

/**
 * @type import('fastify').RouteOptions
 */
const updatePrinter = {
  method: 'POST',
  url: '/printers/:id',
  schema: {
    body: {
      type: 'object',
      properties: {
        name: stringSchema,
        description: stringSchema,
        address: stringSchema,
      },
    },
    response: {
      200: printerSchema,
    },
  },
  async handler(request, response) {
    const printers = this.mongo.db.collection('printers');
    const printer = await printers.findOne({
      _id: request.params.id,
    });

    if (printer === null) return response.callNotFound();
    const { name, description, address } = request.body;

    if (address !== printer.address) {
      const { check, status, reason } = await checkStatusAvailable(
        address,
        printer.protocol,
      );
      if (!check) {
        return response
          .status(404)
          .send({ error: 'could not communicate with the printer' });
      }

      const now = new Date();

      await printers.updateOne(
        { _id: request.params.id },
        {
          $set: {
            address,
            statusLastCheck: now,
            statusLastUpdate: now,
            status,
            reason,
          },
        },
      );
    }

    if (name !== printer.name || description !== printer.description) {
      await printers.updateOne(
        { _id: request.params.id },
        { $set: { name, description } },
      );
    }

    response.send(
      await printers.findOne({
        _id: request.params.id,
      }),
    );
  },
};

module.exports = updatePrinter;
