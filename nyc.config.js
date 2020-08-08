const { NODE_ENV } = process.env;

const tryquire = require('@0ti.me/test-deps').tryquire;

const myNycrc = tryquire('./.my.nycrc.js');

const watermarks = {
  default: {
    branches: [25, 95],
    functions: [25, 95],
    lines: [25, 95],
    statements: [25, 95],
  },
  integration: {
    branches: [50, 70],
    functions: [50, 70],
    lines: [50, 70],
    statements: [50, 70],
  },
};

const coverageLevels = {
  default: {
    branches: 25,
    functions: 25,
    lines: 25,
    statements: 25,
  },
  integration: {
    branches: 50,
    functions: 50,
    lines: 50,
    statements: 50,
  },
};

module.exports = Object.assign(
  {
    all: true,
    'check-coverage': true,
    forceColor: true,
    include: ['src'],
    reporter: ['lcov', 'text', 'text-summary'],
    watermarks: watermarks[NODE_ENV] || watermarks.default,
  },
  coverageLevels[NODE_ENV] || coverageLevels.default,
  myNycrc,
);
