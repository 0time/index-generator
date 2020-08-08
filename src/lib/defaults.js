const { get } = require('@0ti.me/tiny-pfp');
const path = require('path');

module.exports = {
  configFilePath: path.resolve(process.cwd(), 'config'),
  filesMatchingRegex: /.*\.js$/,
  indexFilename: 'index.js',
  outputFilePath: (config) =>
    path.resolve(
      process.cwd(),
      get(config, 'directory'),
      get(config, 'indexFilename'),
    ),
  overwrite: false,
  writeFileSyncOptions: {
    encoding: 'utf-8',
  },
};
