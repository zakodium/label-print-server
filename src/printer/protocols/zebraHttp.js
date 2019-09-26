'use strict';

const net = require('net');

const got = require('got');

const timeoutMilli = 5000;
function timer() {
  let timeout;
  const promise = new Promise((resolve, reject) => {
    timeout = setTimeout(() => {
      const error = new Error('timeout');
      error.code = 'ETIMEDOUT';
      reject(error);
    }, timeoutMilli);
  });
  promise.clear = () => clearTimeout(timeout);
  return promise;
}

async function getStatus(printer) {
  const address = printer.address;
  const request = got(`http://${address}`, { timeout: timeoutMilli });
  const timeout = timer();
  try {
    const result = await Promise.race([request, timeout]);
    const { body } = result;
    return parseBody(body);
  } catch (err) {
    if (isConnectError(err)) {
      return { status: 'UNAVAILABLE', reason: err.code };
    }
    throw err;
  } finally {
    request.cancel();
    timeout.clear();
  }
}

const statusReg = /<H3>Status: <FONT COLOR="\w+">(?<status>\w+)<\/FONT><\/H3>/;
function parseBody(body) {
  const res = statusReg.exec(body);
  if (!res) {
    return { status: 'UNKNOWN', reason: 'HTML parsing error' };
  }
  return parseStatus(res.groups.status);
}

function parseStatus(status) {
  switch (status) {
    case 'READY':
    case 'BEREIT':
      return { status: 'READY', reason: '' };
    default:
      return { status: 'ERROR', reason: status };
  }
}

function send(address, data) {
  return new Promise((resolve, reject) => {
    const socket = net.connect(9100, address, () => {
      socket.end(data, resolve);
    });
    socket.on('error', reject);
  });
}

async function postPrint(printer, job, server) {
  const address = printer.address;

  const toPrint = job.data.repeat(job.copies);
  try {
    await send(address, toPrint);
    return { success: true };
  } catch (err) {
    if (isConnectError(err)) {
      return { error: 'UNAVAILABLE' };
    } else {
      server.log.error({
        reason: 'zebra-http unknown print error',
        err,
      });
      return { error: 'UNKNOWN', stack: err.stack };
    }
  }
}

function isConnectError(err) {
  return (
    err.code === 'ECONNREFUSED' ||
    err.code === 'ENOTFOUND' ||
    err.code === 'ETIMEDOUT'
  );
}

module.exports = {
  getStatus,
  postPrint,
};
