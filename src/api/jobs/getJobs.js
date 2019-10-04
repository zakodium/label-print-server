'use strict';

const {
  jobSchema,
  serializeJob,
  stringSchema,
  numberSchema,
  jobStatusSchema,
} = require('./schemas');

/**
 * @type import('fastify').RouteOptions
 */
const getJobs = {
  method: 'GET',
  url: '/jobs',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        printer: stringSchema,
        status: jobStatusSchema,
        limit: numberSchema,
        user: stringSchema,
      },
      additionalProperties: false,
    },
    response: {
      200: {
        type: 'array',
        items: jobSchema,
      },
    },
  },
  async handler(request) {
    const jobs = this.mongo.db.collection('jobs');
    const toFind = {};
    if (request.query.printer) {
      toFind.printer = request.query.printer;
    }
    if (request.query.status) {
      toFind.status = request.query.status;
    }
    if (request.query.user) {
      toFind.user = request.query.user;
    }
    const find = jobs.find(toFind);
    if (typeof request.query.limit !== 'undefined') {
      find.limit(request.query.limit);
    }
    const result = await find.toArray();
    return result.map(serializeJob);
  },
};

module.exports = getJobs;
