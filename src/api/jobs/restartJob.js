'use strict';

const { jobSchema, stringSchema, serializeJob } = require('./schemas');

/**
 * @type import('fastify').RouteOptions
 */
const getJob = {
  method: 'POST',
  url: '/jobs/:id/restart',
  schema: {
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
    const { value: job } = await jobs.findOneAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          status: 'PENDING',
          statusReason: 'restarted',
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
