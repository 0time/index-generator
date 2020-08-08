const camelCase = require('./camel-case');

const regexAllForwardSlashes = /^[./]*/;
const regexAllPeriods = /\//g;
const regexJsExtension = /\.js$/;

module.exports = (str) =>
  camelCase(
    str.replace(regexJsExtension, '').replace(regexAllForwardSlashes, ''),
  ).replace(regexAllPeriods, '.');

module.exports.regexAllForwardSlashes = regexAllForwardSlashes;
module.exports.regexAllPeriods = regexAllPeriods;
module.exports.regexJsExtension = regexJsExtension;
