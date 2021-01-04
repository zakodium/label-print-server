'use strict';

const stringSchema = { type: 'string' };

const manufacturerSchema = {
  type: 'string',
  enum: ['zebra'],
};

const protocolSchema = {
  type: 'string',
  enum: ['zebra'],
};

const statusSchema = {
  type: 'string',
  enum: ['UNKNOWN', 'READY', 'UNAVAILABLE', 'ERROR'],
};

const printerUpdateSchema = {
  type: 'object',
  properties: {
    name: stringSchema,
    description: stringSchema,
    address: stringSchema,
  },
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
    statusLastCheck: stringSchema,
    statusLastUpdate: stringSchema,
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
  printerUpdateSchema,
};
