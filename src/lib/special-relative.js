// path.relative can return a path without a leading `.`, this works around that
const path = require('path');

const specialRelativeRegex = /^(\.{1,2}\/)|^(\/)/;

module.exports = (from, to) => {
  const result = path.relative(from, to);

  return specialRelativeRegex.test(result) ? result : `./${result}`;
};
