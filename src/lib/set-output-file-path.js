// Destructively modifies the config value to replace an outputFilePath function (if present)
// with the result of that function called with the config object
const isString = require('./is-string');

module.exports = (config) =>
  isString(config.outputFilePath)
    ? config
    : Object.assign(config, {
        outputFilePath: config.outputFilePath(config),
      });
