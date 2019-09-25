'use strict';

const zebraHttp = require('./services/zebraHttp');

/**
 * @param printer
 * @param {string} printerId
 */
async function getStatus(printer) {
  let status;
  switch (printer.service) {
    case 'zebra-http':
      status = await zebraHttp.getStatus(printer);
      break;
    default:
      throw new Error(`unhandled service type: ${printer.service}`);
  }
  return status;
}

module.exports = {
  getStatus,
};
