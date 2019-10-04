'use strict';

const stringSchema = { type: 'string' };
const numberSchema = { type: 'number' };

const jobStatusSchema = {
  type: 'string',
  enum: ['PENDING', 'PRINTING', 'SUCCESS', 'ERROR', 'CANCELLED'],
};

const jobSchema = {
  type: 'object',
  properties: {
    _id: stringSchema,
    creationDate: stringSchema,
    name: stringSchema,
    printer: stringSchema,
    data: stringSchema,
    format: stringSchema,
    copies: numberSchema,
    status: jobStatusSchema,
    statusReason: stringSchema,
    statusLastUpdate: stringSchema,
    clientIp: stringSchema,
    user: { type: ['string', 'null'] },
  },
  required: [
    '_id',
    'creationDate',
    'name',
    'printer',
    'data',
    'format',
    'copies',
    'status',
    'statusReason',
    'statusLastUpdate',
    'clientIp',
    'user',
  ],
};

const updateActionSchema = {
  type: 'string',
  enum: ['RESTART', 'CANCEL'],
};

function serializeJob(job) {
  return {
    ...job,
    creationDate: job.creationDate.toISOString(),
    statusLastUpdate: job.statusLastUpdate.toISOString(),
  };
}

module.exports = {
  jobSchema,
  numberSchema,
  serializeJob,
  stringSchema,
  updateActionSchema,
};
