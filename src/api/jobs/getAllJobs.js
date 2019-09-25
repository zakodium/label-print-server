'use strict';

const { jobSchema } = require('./schemas');

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
    return result.map((item) => ({
      ...item,
      date: item.date.toISOString(),
    }));
  },
};

module.exports = getAllJobs;
