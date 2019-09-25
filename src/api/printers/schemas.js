'use strict';

const string = { type: 'string' };

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
    _id: string,
    name: string,
    description: string,
    manufacturer: manufacturerSchema,
    service: serviceSchema,
    address: string,
    status: statusSchema,
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
  string,
};
