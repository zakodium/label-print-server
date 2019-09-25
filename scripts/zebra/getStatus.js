'use strict';

const { getStatus } = require('../../src/printer/status');

const ip = process.argv[2];
if (!ip) {
  console.error('usage: node scripts/zebra/getStatus <ip address>');
  process.exit(1);
}

getStatus({ service: 'zebra-http', address: ip }).then(console.log);
