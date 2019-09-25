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
    date: stringSchema,
    printer: stringSchema,
    data: stringSchema,
    format: stringSchema,
    copies: numberSchema,
    status: jobStatusSchema,
    clientIp: stringSchema,
  },
  required: ['_id', 'date', 'printer', 'status', 'clientIp'],
};

module.exports = {
  jobSchema,
  numberSchema,
  stringSchema,
};
