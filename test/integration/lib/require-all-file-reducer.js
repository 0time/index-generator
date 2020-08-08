const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const requireAllFileReducer = tquire(me);

  it('should correctly process sibling directories', () =>
    expect(
      requireAllFileReducer({
        directory: './src',
        outputFilePath: './test/integration/fixtures/generated.index.js',
      })({}, './test'),
    ).to.deep.equal({ test: "require('../../../src/test')" }));

  it('should correctly process other directories', () =>
    expect(
      requireAllFileReducer({
        directory: '/path/to/src',
        outputFilePath: '/another/index.js',
      })({}, './test'),
    ).to.deep.equal({ test: "require('../path/to/src/test')" }));
});
