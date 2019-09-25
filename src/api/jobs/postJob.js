'use strict';

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
        type: stringSchema,
        copies: numberSchema,
        data: stringSchema,
      },
      required: ['printer', 'type', 'data'],
    },
    response: {
      200: jobSchema,
    },
  },
  async handler() {
    const jobs = this.mongo.db.collection('jobs');
    const result = await jobs.find({}).toArray();
    return result;
  },
};

module.exports = postJob;
