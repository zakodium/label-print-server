'use strict';

const ipp = require('ipp');

const ip = process.argv[2];
if (!ip) {
  console.error('usage: node scripts/ipp/getAttributes <ip address>');
  process.exit(1);
}

const printer = ipp.Printer(`http://${ip}:631/ipp`);

printer.execute('Get-Printer-Attributes', null, (err, res) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(res);
});
