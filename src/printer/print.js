'use strict';

const server = require('../fastify');

const zebraHttp = require('./protocols/zebraHttp');
const { updateStatus } = require('./status');

/**
 * Print the next job in PENDING state.
 * @returns {boolean} Whether a pending job was found or not.
 */
async function printNextJob() {
  const jobs = server.mongo.db.collection('jobs');
  const printers = server.mongo.db.collection('printers');
  const { value: nextJob } = await jobs.findOneAndUpdate(
    { status: 'PENDING' },
    {
      $set: {
        status: 'PRINTING',
        statusReason: '',
        statusLastUpdate: new Date(),
      },
    },
    { returnOriginal: false },
  );
  if (nextJob === null) return false;
  const printer = await printers.findOne({ _id: nextJob.printer });

  // Check status
  const status = await updateStatus(printer);
  if (status.status !== 'READY') {
    await jobs.updateOne(
      { _id: nextJob._id },
      {
        $set: {
          status: 'ERROR',
          statusReason: `Printer status is ${status.status} (${status.reason})`,
          statusLastUpdate: new Date(),
        },
      },
    );
    return true;
  }

  let result;
  switch (printer.protocol) {
    case 'zebra-http':
      result = await zebraHttp.postPrint(printer, nextJob, server);
      break;
    default:
      throw new Error(`unhandled protocol: ${printer.protocol}`);
  }
  let toStore;
  if (result.success) {
    toStore = {
      status: 'SUCCESS',
      statusReason: '',
      statusLastUpdate: new Date(),
    };
  } else {
    toStore = {
      status: 'ERROR',
      statusReason: result.error,
      statusLastUpdate: new Date(),
    };
  }
  await jobs.updateOne({ _id: nextJob._id }, { $set: toStore });
  return true;
}

module.exports = {
  printNextJob,
};
