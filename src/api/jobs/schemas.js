'use strict';

const stringSchema = { type: 'string' };
const numberSchema = { type: 'number' };

const jobStatusSchema = {
  type: 'string',
  enum: ['PENDING', 'SUCCESS', 'ERROR'],
};

const jobSchema = {
  type: 'object',
  properties: {
    _id: stringSchema,
    date: stringSchema,
    printer: stringSchema,
    status: jobStatusSchema,
  },
  required: ['_id', 'date', 'printer', 'status'],
};

module.exports = {
  jobSchema,
  numberSchema,
  stringSchema,
};
