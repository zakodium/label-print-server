'use strict';

const stringSchema = { type: 'string' };

const manufacturerSchema = {
  type: 'string',
  enum: ['zebra'],
};

const serviceSchema = {
  type: 'string',
  enum: ['zebra-http'],
};

const statusSchema = {
  type: 'string',
  enum: ['UNKNOWN', 'READY', 'UNAVAILABLE', 'ERROR'],
};

const printerSchema = {
  type: 'object',
  properties: {
    _id: stringSchema,
    name: stringSchema,
    description: stringSchema,
    manufacturer: manufacturerSchema,
    service: serviceSchema,
    address: stringSchema,
    status: statusSchema,
    statusReason: stringSchema,
  },
  required: [
    '_id',
    'name',
    'description',
    'manufacturer',
    'service',
    'address',
  ],
};

module.exports = {
  manufacturerSchema,
  printerSchema,
  serviceSchema,
  statusSchema,
  stringSchema,
};
