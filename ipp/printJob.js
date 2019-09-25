'use strict';

const fs = require('fs');
const path = require('path');

const ipp = require('ipp');

const ip = process.argv[2];
if (!ip) {
  console.error('usage: node scripts/printJob <ip address>');
  process.exit(1);
}

const pdf = path.join(__dirname, 'test_pdf.ps');
const data = fs.readFileSync(pdf);

const msg = {
  'operation-attributes-tag': {
    'requesting-user-name': 'MZ',
    'job-name': 'myfile.pdf',
    'document-format': 'application/postscript',
  },
  // 'job-attributes-tag': {
  //   'media-col': {
  //     'media-source': 'tray-2',
  //   },
  // },
  data: data,
};

const printer = ipp.Printer(`http://${ip}:631/ipp`);

printer.execute('Print-Job', msg, (err, res) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(res);
});
