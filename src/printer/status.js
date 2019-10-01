'use strict';

const fastify = require('../fastify');

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

async function updateStatus(printer) {
  const printers = fastify.mongo.db.collection('printers');
  const status = await getStatus(printer);
  fastify.log.trace({ printer: printer._id, ...status }, 'Printer status');
  const now = new Date();
  const updateRequest = {
    statusLastCheck: now,
  };
  if (
    printer.status !== status.status ||
    printer.statusReason !== status.reason
  ) {
    updateRequest.status = status.status;
    updateRequest.statusReason = status.reason;
    updateRequest.statusLastUpdate = now;
  }
  await printers.updateOne({ _id: printer._id }, { $set: updateRequest });
  return status;
}

async function updateAllStatuses() {
  const printers = fastify.mongo.db.collection('printers');
  const printerQuery = printers.find({});
  for await (const printer of printerQuery) {
    // eslint-disable-next-line no-await-in-loop
    await updateStatus(printer);
  }
}

module.exports = {
  getStatus,
  updateStatus,
  updateAllStatuses,
};
