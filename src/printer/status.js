'use strict';

const fastify = require('../fastify');

const zebra = require('./protocols/zebra');

/**
 * @param printer
 * @param {string} printerId
 */
async function getStatus(printer) {
  let status;
  switch (printer.protocol) {
    case 'zebra':
      status = await zebra.getStatus(printer);
      break;
    default:
      throw new Error(`unhandled protocol: ${printer.protocol}`);
  }
  return status;
}

async function checkStatusAvailable(address, protocol) {
  const printerStatus = await getStatus({ address, protocol });
  if (
    printerStatus.status === 'UNKNOWN' ||
    printerStatus.status === 'UNAVAILABLE'
  ) {
    return { check: false };
  }
  return {
    check: true,
    status: printerStatus.status,
    reason: printerStatus.reason,
  };
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
    await updateStatus(printer);
  }
}

module.exports = {
  getStatus,
  updateStatus,
  updateAllStatuses,
  checkStatusAvailable,
};
