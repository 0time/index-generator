const fs = require('fs');

module.exports = (filepath, message) => {
  if (fs.existsSync(filepath) && !fs.statSync(filepath).isFile()) {
    throw new Error(message);
  }
};
