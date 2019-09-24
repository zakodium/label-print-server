'use strict';

const ipp = require('ipp');

const ip = process.argv[2];
if (!ip) {
  console.error('usage: node scripts/getJobs <ip address>');
  process.exit(1);
}

const msg = {
  'operation-attributes-tag': {
    // use these to view completed jobs...
    // "limit": 10,
    'which-jobs': 'completed',

    'requested-attributes': [
      'job-id',
      'job-uri',
      'job-state',
      'job-state-reasons',
      'job-name',
      'job-originating-user-name',
      'job-media-sheets-completed',
    ],
  },
};

const printer = ipp.Printer(`http://${ip}:631/ipp`);

printer.execute('Get-Jobs', msg, (err, res) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(res);
});
