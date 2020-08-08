const dirListReducer = require('./dir-list-reducer');
const fs = require('fs');
const reduceToSetsOfStats = require('./reduce-to-sets-of-stats');

module.exports = (dir) => {
  const dirList = fs.readdirSync(dir);

  const setsOfStats = dirList.map(reduceToSetsOfStats(dir));

  return dirList.reduce(dirListReducer(dir, setsOfStats), {
    directories: [],
    files: [],
  });
};
