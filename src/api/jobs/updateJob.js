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
    const { action } = request.query.action;
    const status = action === 'CANCEL' ? 'CANCELLED' : 'PENDING';
    const { value: job } = await jobs.findOneAndUpdate(
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
    if (job === null) return response.callNotFound();
    return serializeJob(job);
  },
};

module.exports = getJob;
