'use strict';

const stringSchema = { type: 'string' };
const numberSchema = { type: 'number' };

const jobStatusSchema = {
  type: 'string',
  enum: ['PENDING', 'PRINTING', 'SUCCESS', 'ERROR'],
};

const jobSchema = {
  type: 'object',
  properties: {
    _id: stringSchema,
    creationDate: stringSchema,
    printer: stringSchema,
    data: stringSchema,
    format: stringSchema,
    copies: numberSchema,
    status: jobStatusSchema,
    statusReason: stringSchema,
    statusLastUpdate: stringSchema,
    clientIp: stringSchema,
  },
  required: [
    '_id',
    'creationDate',
    'printer',
    'status',
    'statusReason',
    'statusUpdate',
    'clientIp',
  ],
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
};
