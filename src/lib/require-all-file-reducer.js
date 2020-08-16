const convertToCamelCase = require('./convert-to-camel-case');
const path = require('@0ti.me/en-path');
const { set } = require('@0ti.me/tiny-pfp');

module.exports = (config) => (acc, file) =>
  set(
    acc,
    convertToCamelCase(file),
    "require('" +
      path.srelative(
        path.resolve(process.cwd(), path.dirname(config.outputFilePath)),
        path.resolve(config.directory, file),
      ) +
      "')",
  );
