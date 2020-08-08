const defaults = require('./lib/defaults');
const generateIndex = require('./lib/generate-index');
const isString = require('./lib/is-string');
const path = require('path');

module.exports = (config) =>
  generateIndex(
    Object.assign(
      {},
      defaults,
      isString(config.configFilePath)
        ? require(path.resolve(process.cwd(), config.configFilePath))
        : {},
      isString(config) ? require(config) : config,
    ),
  );
