'use strict';

const { jobSchema, stringSchema, serializeJob } = require('./schemas');

const getJobSchema = { ...jobSchema };
delete getJobSchema.data;

/**
 * @type import('fastify').RouteOptions
 */
const getJob = {
  method: 'GET',
  url: '/jobs/:id',
  schema: {
    params: {
      type: 'object',
      properties: {
        id: stringSchema,
      },
      required: ['id'],
    },
    response: {
      200: getJobSchema,
    },
  },
  async handler(request, response) {
    const jobs = this.mongo.db.collection('jobs');
    const job = await jobs.findOne({ _id: request.params.id });
    if (job === null) return response.callNotFound();
    return serializeJob(job);
  },
};

module.exports = getJob;
