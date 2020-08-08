const { flow } = require('@0ti.me/tiny-pfp').fp;

const assertFileDoesNotExist = require('./assert-file-does-not-exist');
const assertIsAFileIfPresent = require('./assert-is-a-file-if-present');
const given = require('./given');

module.exports = (args) =>
  flow([
    given({
      condition: args.overwrite !== true,
      action: () =>
        assertFileDoesNotExist(
          args.outputFilePath,
          `File ${args.outputFilePath} exists and overwrite is false (${args.overwrite})`,
        ),
    }),
    given({
      condition: args.overwrite === true,
      action: () =>
        assertIsAFileIfPresent(
          args.outputFilePath,
          `Path ${args.outputFilePath} exists and is not a file so it cannot be overwritten`,
        ),
      args,
    }),
  ])(args);
