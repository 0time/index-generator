const reduceToTypesSync = require('./reduce-to-types-sync');

module.exports = ({
  directory,
  filesMatchingRegex,
  ignoreSelf,
  outputFilePath,
}) => {
  const types = { directories: [directory], files: [] };

  while (types.directories.length > 0) {
    const currentDirectory = types.directories.pop();
    const newTypes = reduceToTypesSync(currentDirectory);

    types.directories = types.directories.concat(newTypes.directories);
    types.files = types.files.concat(
      newTypes.files.filter(
        (each) =>
          new RegExp(filesMatchingRegex).test(each) &&
          // either ignoreSelf is false or the file doesn't match the destination name
          (!ignoreSelf || each !== outputFilePath),
      ),
    );
  }

  return types.files;
};
