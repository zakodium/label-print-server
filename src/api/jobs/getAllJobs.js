'use strict';

const { jobSchema, serializeJob } = require('./schemas');

/**
 * @type import('fastify').RouteOptions
 */
const getAllJobs = {
  method: 'GET',
  url: '/jobs',
  schema: {
    response: {
      200: {
        type: 'array',
        items: jobSchema,
      },
    },
  },
  async handler() {
    const jobs = this.mongo.db.collection('jobs');
    const result = await jobs.find({}).toArray();
    return result.map(serializeJob);
  },
};

module.exports = getAllJobs;
