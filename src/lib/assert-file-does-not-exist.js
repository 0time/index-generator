const fs = require('fs');

module.exports = (filepath, message) => {
  if (fs.existsSync(filepath)) {
    throw new Error(message);
  }
};
