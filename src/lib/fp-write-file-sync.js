const fs = require('fs');

module.exports = (args) => (contents) =>
  fs.writeFileSync(args.outputFilePath, contents, args.writeFileOptions);
