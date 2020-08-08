// move me to tiny-pfp

const prettier = require('prettier');

module.exports = (config) => (content) => {
  const lPrettierConfig = {
    filepath: config.outputFilePath,
  };

  return prettier
    .resolveConfig(config.outputFilePath, lPrettierConfig)
    .then((config) =>
      prettier.format(content, Object.assign(lPrettierConfig, config)),
    );
};
