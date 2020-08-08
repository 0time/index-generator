const path = require('path');

const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const defaults = tquire(me);

  it('should define the default arguments', () =>
    expect(Object.keys(defaults).sort()).to.deep.equal(
      [
        'configFilePath',
        'indexFilename',
        'outputFilePath',
        'overwrite',
        'writeFileSyncOptions',
      ].sort(),
    ));

  it('should default overwrite to false', () =>
    expect(defaults.overwrite).to.equal(false));

  describe('given the required arguments', () => {
    const config = {
      directory: 'directory',
      indexFilename: 'index.js',
    };

    const expectedOutputFilePath = path.resolve(
      process.cwd(),
      config.directory,
      config.indexFilename,
    );

    it('should define an outputFilePath function which tries to determine the output file path automatically', () =>
      expect(defaults.outputFilePath(config)).to.equal(expectedOutputFilePath));
  });
});
