'use strict';

const ipp = require('ipp');

const ip = process.argv[2];
if (!ip) {
  console.error('usage: node scripts/getJob <ip address>');
  process.exit(1);
}

const msg = {
  'operation-attributes-tag': {
    'job-uri': `ipp://192.168.1.25:631/ipp/print?34`,
  },
};

const printer = ipp.Printer(`http://${ip}:631/ipp`);

printer.execute('Get-Job-Attributes', msg, (err, res) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(res);
});
