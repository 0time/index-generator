const { d, expect, pquire, uuid } = deps;

const me = __filename;

d(me, () => {
  // An array of objects with an arg: [] and returnValue: <object>|<array>|<primitive>|etc.
  let reduceToTypesSyncReturnList = [];
  let reduceToTypesSync = null;
  let mocks = null;
  let listFilesSync = null;

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
});
