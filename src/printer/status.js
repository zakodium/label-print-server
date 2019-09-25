'use strict';

const zebraHttp = require('./protocols/zebraHttp');

/**
 * @param printer
 * @param {string} printerId
 */
async function getStatus(printer) {
  let status;
  switch (printer.protocol) {
    case 'zebra-http':
      status = await zebraHttp.getStatus(printer);
      break;
    default:
      throw new Error(`unhandled protocol: ${printer.protocol}`);
  }
  return status;
}

module.exports = {
  getStatus,
};
