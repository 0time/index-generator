const {
  d,
  expect,
  pquire,
  sinon: { stub },
} = deps;

const me = __filename;

d(me, () => {
  const dir = Symbol();
  const each = Symbol();
  const mockPathResolveResult = Symbol();
  const mockStatSyncResult = Symbol();

  let mockFs = null;
  let mockPath = null;
  let mockPathResolve = null;
  let mocks = null;
  let mockStatSync = null;
  let reduceToSetsOfStats = null;

  beforeEach(() => {
    mocks = {};

    mockStatSync = stub().returns(mockStatSyncResult);

    mockFs = {
      statSync: mockStatSync,
    };

    mockPathResolve = stub().returns(mockPathResolveResult);

    mockPath = {
      resolve: mockPathResolve,
    };

    mocks['fs'] = mockFs;
    mocks['path'] = mockPath;

    reduceToSetsOfStats = pquire(me, mocks);
  });

  it('should call path.resolve with dir and each', () => {
    reduceToSetsOfStats(dir)(each);

    expect(mockPathResolve).to.have.been.calledOnceWithExactly(dir, each);
  });

  it('should call fs.statSync with the result of path.resolve', () => {
    reduceToSetsOfStats(dir)(each);

    expect(mockStatSync).to.have.been.calledOnceWithExactly(
      mockPathResolveResult,
    );
  });

  it('should return the result of fs.statSync', () =>
    expect(reduceToSetsOfStats(dir)(each)).to.equal(mockStatSyncResult));
});
