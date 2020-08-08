const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  describe('given a normal require', () => {
    const dirListReducer = tquire(me);

    describe('dirListReducer', () => {
      const emptyAcc = { directories: [], files: [] };

      const aFileNamed = () => ({
        isDirectory: () => false,
        isFile: () => true,
      });

      const aDirNamed = () => ({
        isDirectory: () => true,
        isFile: () => false,
      });

      const setsOfStats = [
        aFileNamed('test1'),
        aFileNamed('test2'),
        aDirNamed('test3'),
        aDirNamed('test4'),
        aFileNamed('test5'),
        aDirNamed('test6'),
      ];

      const readdirResult = [
        'test1',
        'test2',
        'test3',
        'test4',
        'test5',
        'test6',
      ];

      it('should reduce files to files and dirs to dirs', () =>
        expect(
          readdirResult.reduce(dirListReducer('.', setsOfStats), emptyAcc),
        ).to.deep.equal({
          directories: ['./test3', './test4', './test6'],
          files: ['./test1', './test2', './test5'],
        }));
    });
  });
});
