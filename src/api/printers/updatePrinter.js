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
        protocol: protocolSchema,
      },
    },
    response: {
      200: printerSchema,
    },
  },
  async handler(request, response) {
    const printers = this.mongo.db.collection('printers');
    const result = await printers.findOne({
      _id: request.params.id,
    });

    if (result === null) return response.callNotFound();
    const { name, description, address, protocol } = request.body;

    if (address !== result.address) {
      const check = await checkStatusAvailable(address, protocol);
      if (!check) {
        return response
          .status(404)
          .send({ error: 'could not communicate with the printer' });
      }
    }

    if (name !== result.name || description !== result.description) {
      await printers.updateOne(
        { _id: request.params.id },
        { $set: { name, description, address } },
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
