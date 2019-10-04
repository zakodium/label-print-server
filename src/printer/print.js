'use strict';

const fastify = require('../fastify');

const zebra = require('./protocols/zebra');
const { updateStatus } = require('./status');

/**
 * Print the next job in PENDING state.
 * @returns {boolean} Whether a pending job was found or not.
 */
async function printNextJob() {
  fastify.log.trace('Print next job');
  const jobs = fastify.mongo.db.collection('jobs');
  const printers = fastify.mongo.db.collection('printers');
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
  if (nextJob === null) {
    fastify.log.trace('No job to print');
    return false;
  }
  const printer = await printers.findOne({ _id: nextJob.printer });
  const log = fastify.log.child({
    action: 'printNextJob',
    job: nextJob._id,
    printer: nextJob.printer,
  });

  // Check status
  const status = await updateStatus(printer);
  if (status.status !== 'READY') {
    const reason = `Printer status is ${status.status} (${status.reason})`;
    log.info(reason);
    await jobs.updateOne(
      { _id: nextJob._id },
      {
        $set: {
          status: 'ERROR',
          statusReason: reason,
          statusLastUpdate: new Date(),
        },
      },
    );
    return true;
  }

  let result;
  switch (printer.protocol) {
    case 'zebra':
      result = await zebra.postPrint(printer, nextJob, fastify);
      break;
    default:
      throw new Error(`unhandled protocol: ${printer.protocol}`);
  }
  let toStore;
  if (result.success) {
    log.info('success');
    toStore = {
      status: 'SUCCESS',
      statusReason: '',
      statusLastUpdate: new Date(),
    };
  } else {
    log.info(`error ${result.error}`);
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
