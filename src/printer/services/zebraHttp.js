'use strict';

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
  try {
    const request = got(`http://${address}`, { timeout: timeoutMilli });
    const timeout = timer();
    const result = await Promise.race([request, timeout]);
    timeout.clear();
    const { body } = result;
    return parseBody(body).status;
  } catch (e) {
    if (
      e.code === 'ECONNREFUSED' ||
      e.code === 'ENOTFOUND' ||
      e.code === 'ETIMEDOUT'
    ) {
      return 'UNAVAILABLE';
    }
    throw e;
  }
}

const statusReg = /<H3>Status: <FONT COLOR="\w+">(?<status>\w+)<\/FONT><\/H3>/;
function parseBody(body) {
  const res = statusReg.exec(body);
  if (!res) {
    return { status: 'UNKNOWN' };
  }
  return { status: parseStatus(res.groups.status) };
}

function parseStatus(status) {
  switch (status) {
    case 'READY':
    case 'BEREIT':
      return 'READY';
    default:
      return 'UNKNOWN';
  }
}

module.exports = {
  getStatus,
};
