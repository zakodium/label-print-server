'use strict';

const uuid = require('uuid/v4');

const { jobSchema, numberSchema, stringSchema } = require('./schemas');

/**
 * @type import('fastify').RouteOptions
 */
const postJob = {
  method: 'POST',
  url: '/jobs',
  schema: {
    body: {
      type: 'object',
      properties: {
        printer: stringSchema,
        data: stringSchema,
        format: stringSchema,
        copies: numberSchema,
      },
      required: ['printer', 'data'],
    },
    response: {
      200: jobSchema,
    },
  },
  async handler(request, response) {
    const body = request.body;
    const jobs = this.mongo.db.collection('jobs');
    const printers = this.mongo.db.collection('printers');
    const printer = await printers.findOne({ _id: body.printer });
    if (!printer) return response.callNotFound();

    const { copies = 1, format = printer.defaultFormat } = body;
    if (!Number.isInteger(copies) || copies < 1) {
      return response
        .status(400)
        .send({ error: 'number of copies must be a positive integer' });
    }

    const job = {
      _id: uuid(),
      ...body,
      format,
      copies,
      status: 'PENDING',
      clientIp: request.ip,
    };

    // todo try to send job and store result

    return job;
  },
};

module.exports = postJob;
