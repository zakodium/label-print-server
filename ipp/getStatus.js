'use strict';

const ipp = require('ipp');

const ip = process.argv[2];
if (!ip) {
  console.error('usage: node scripts/getStatus <ip address>');
  process.exit(1);
}

const msg = {
  'operation-attributes-tag': {
    'document-format': 'application/pdf',
    'requested-attributes': [
      'queued-job-count',
      'marker-levels',
      'printer-state',
      'printer-state-reasons',
      'printer-up-time',
    ],
  },
};

const printer = ipp.Printer(`http://${ip}:631/ipp`);

printer.execute('Get-Printer-Attributes', msg, (err, res) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(res);
});
