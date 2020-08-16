const { d, expect, pquire, uuid } = deps;

const me = __filename;

d(me, () => {
  const filesMatchingRegex = /.*\.js$/;

  let listFilesSync = null;
  let mocks = null;
  let reduceToTypesSync = null;
  // An array of objects with an arg: [] and returnValue: <object>|<array>|<primitive>|etc.
  let reduceToTypesSyncReturnList = [];

  afterEach(() => {
    listFilesSync = null;
    mocks = null;
    reduceToTypesSync = null;
    reduceToTypesSyncReturnList = [];
  });

  const initializeListFilesSync = () => {
    mocks = {};

    reduceToTypesSync = (inp) =>
      reduceToTypesSyncReturnList.find(({ args }) => args === inp).returnValue;

    mocks['./reduce-to-types-sync'] = reduceToTypesSync;

    listFilesSync = pquire(me, mocks);
  };

  describe('given a single folder with files', () => {
    const args = { directory: Symbol() };
    const file = `${uuid()}.js`;
    const files = [file];

    const returnValue = {
      directories: [],
      files,
    };

    beforeEach(() => {
      reduceToTypesSyncReturnList.push({
        args: args.directory,
        returnValue,
      });

      initializeListFilesSync();
    });

    it('should return the files', () =>
      expect(listFilesSync(args)).to.deep.equal(files));
  });

  describe('given /bla, /bla2/bla with initial dir /', () => {
    const args = { directory: '/' };

    beforeEach(() => {
      reduceToTypesSyncReturnList.push({
        args: args.directory,
        returnValue: {
          directories: ['/bla2'],
          files: ['/bla'],
        },
      });

      reduceToTypesSyncReturnList.push({
        args: '/bla2',
        returnValue: {
          directories: [],
          files: ['/bla2/bla'],
        },
      });

      initializeListFilesSync();
    });

    it('should return the full list of files', () =>
      expect(listFilesSync(args)).to.deep.equal(['/bla', '/bla2/bla']));
  });

  describe('given that a file result matches the output file and ignoreSelf=true', () => {
    const args = {
      directory: '/',
      filesMatchingRegex,
      ignoreSelf: true,
      outputFilePath: '/bla/index.js',
    };

    let otherLibs = null;

    beforeEach(() => {
      otherLibs = [`other-lib-1-${uuid()}.js`, `other-lib-2-${uuid()}.js`];
      reduceToTypesSyncReturnList.push({
        args: args.directory,
        returnValue: {
          directories: [],
          files: ['/bla/index.js'].concat(otherLibs),
        },
      });

      initializeListFilesSync();
    });

    it('should only return the other files', () =>
      expect(listFilesSync(args)).to.deep.equal(otherLibs));
  });
});
