const convertToCamelCase = require('./convert-to-camel-case');
const path = require('path');
const { set } = require('@0ti.me/tiny-pfp');
const specialRelative = require('./special-relative');

module.exports = (config) => (acc, file) =>
  set(
    acc,
    convertToCamelCase(file),
    "require('" +
      specialRelative(
        path.resolve(process.cwd(), path.dirname(config.outputFilePath)),
        path.resolve(config.directory, file),
      ) +
      "')",
  );
