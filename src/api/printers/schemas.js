'use strict';

const stringSchema = { type: 'string' };

const manufacturerSchema = {
  type: 'string',
  enum: ['zebra'],
};

const protocolSchema = {
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
    protocol: protocolSchema,
    address: stringSchema,
    status: statusSchema,
    statusReason: stringSchema,
    defaultFormat: stringSchema,
    supportedFormats: {
      type: 'array',
      items: stringSchema,
    },
  },
  required: [
    '_id',
    'name',
    'description',
    'manufacturer',
    'protocol',
    'address',
    'status',
    'statusReason',
    'defaultFormat',
    'supportedFormats',
  ],
};

module.exports = {
  manufacturerSchema,
  printerSchema,
  protocolSchema,
  statusSchema,
  stringSchema,
};
