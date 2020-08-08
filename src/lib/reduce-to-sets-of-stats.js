const fs = require('fs');
const path = require('path');

module.exports = (dir) => (each) => fs.statSync(path.resolve(dir, each));
