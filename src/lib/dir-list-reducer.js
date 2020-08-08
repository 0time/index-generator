module.exports = (dir, setsOfStats) => (
  { directories, files },
  each,
  index,
) => ({
  files: setsOfStats[index].isFile() ? files.concat([`${dir}/${each}`]) : files,
  directories: setsOfStats[index].isDirectory()
    ? directories.concat([`${dir}/${each}`])
    : directories,
});
