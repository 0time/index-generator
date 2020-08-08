const { flow, map, reduce, stringReplace } = require('@0ti.me/tiny-pfp').fp;

const fpJsonStringify = require('./fp-json-stringify');
const fpPrependString = require('./fp-prepend-string');
const fpPrettierFormat = require('./fp-prettier-format');
const fpWriteFileSync = require('./fp-write-file-sync');
const listFilesSync = require('./list-files-sync');
const requireAllFileReducer = require('./require-all-file-reducer');
const setOutputFilePath = require('./set-output-file-path');
const validateOverwrite = require('./validate-overwrite');
const verifyArgs = require('./verify-args');

const doubleQuoteRegex = /"/g;

module.exports = (args) =>
  flow([
    verifyArgs,
    setOutputFilePath,
    validateOverwrite,
    listFilesSync,
    map(stringReplace(args.directory, '.')),
    reduce(requireAllFileReducer(args), {}),
    fpJsonStringify(null, 2),
    fpPrependString('module.exports = '),
    stringReplace(doubleQuoteRegex, ''),
    fpPrettierFormat(args),
    fpWriteFileSync(args),
  ])(args);

module.exports.doubleQuoteRegex = doubleQuoteRegex;
