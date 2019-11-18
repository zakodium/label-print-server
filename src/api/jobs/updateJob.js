'use strict';

const {
  jobSchema,
  stringSchema,
  serializeJob,
  updateActionSchema,
} = require('./schemas');

/**
 * @type import('fastify').RouteOptions
 */
const getJob = {
  method: 'POST',
  url: '/jobs/:id/update',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        action: updateActionSchema,
      },
      required: ['action'],
    },
    params: {
      type: 'object',
      properties: {
        id: stringSchema,
      },
      required: ['id'],
    },
    response: {
      200: jobSchema,
    },
  },
  async handler(request, response) {
    const jobs = this.mongo.db.collection('jobs');
    const printers = this.mongo.db.collection('printers');

    const { action } = request.query;
    const status = action === 'CANCEL' ? 'CANCELLED' : 'PENDING';

    const job = await jobs.findOne({ _id: request.params.id });

    const printer = await printers.findOne({ _id: job.printer });
    if (printer === null) {
      return response.callNotFound();
    }

    const { value: jobUpdated } = await jobs.findOneAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          status,
          statusReason: 'update',
          statusLastUpdate: new Date(),
        },
      },
      {
        returnOriginal: false,
      },
    );
    if (jobUpdated === null) return response.callNotFound();
    return serializeJob(jobUpdated);
  },
};

module.exports = getJob;
