module.exports = args =>
  ['directory'].reduce((acc, arg) => {
    if (!args[arg]) {
      throw new Error(
        `missing argument ${arg} in args=${JSON.stringify(args)}`,
      );
    }

    return acc;
  }, args);
