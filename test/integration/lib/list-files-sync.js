const { d, expect, path, tquire } = deps;

const me = path.relative(process.cwd(), __filename);

d(me, () => {
  describe('given a normal require', () => {
    const listFiles = tquire(me);

    const meRelative = `./${me}`;

    it('should detect this file in the list of files in the test directory', () =>
      expect(
        listFiles({ directory: './test' }).find((x) => x === meRelative),
      ).to.equal(meRelative));
  });
});
