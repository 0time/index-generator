const proxyquire = require('proxyquire').noPreserveCache().noCallThru();

const {
  d,
  expect,
  sinon: { stub },
  tquire,
} = deps;

const me = __filename;

d(me, () => {
  const dir = Symbol();
  const mockDirListMapResult = Symbol();
  const mockDirListReducerResult = Symbol();
  const mockDirListReduceResult = Symbol();
  const mockReduceToSetsOfStatsResult = Symbol();

  let mockFs = null;
  let mocks = null;
  let readdirSyncMockResult = null;
  let mockDirListMap = null;
  let mockDirListReduce = null;
  let mockDirListReducer = null;
  let mockReduceToSetsOfStats = null;
  let reduceToTypesSync = null;

  beforeEach(() => {
    mocks = {};

    mockDirListMap = stub().returns(mockDirListMapResult);

    mockReduceToSetsOfStats = stub().returns(mockReduceToSetsOfStatsResult);

    mockDirListReduce = stub().returns(mockDirListReduceResult);

    mockDirListReducer = stub().returns(mockDirListReducerResult);

    readdirSyncMockResult = {
      map: mockDirListMap,
      reduce: mockDirListReduce,
    };

    mockFs = {
      readdirSync: stub().returns(readdirSyncMockResult),
    };

    mocks['./dir-list-reducer'] = mockDirListReducer;
    mocks['fs'] = mockFs;
    mocks['./reduce-to-sets-of-stats'] = mockReduceToSetsOfStats;

    reduceToTypesSync = proxyquire(tquire(me, false), mocks);
  });

  it('should try to readdirSync', () => {
    reduceToTypesSync(dir);

    expect(mockFs.readdirSync).to.have.been.calledOnceWithExactly(dir);
  });

  it('should try to reduce the directory to a set of stats', () => {
    reduceToTypesSync(dir);

    expect(mockReduceToSetsOfStats).to.have.been.calledOnceWithExactly(dir);
  });

  it('should try to use the reduction to a set of stats as a map function for dirList', () => {
    reduceToTypesSync(dir);

    expect(mockDirListMap).to.have.been.calledOnceWithExactly(
      mockReduceToSetsOfStatsResult,
    );
  });

  it('should use dirListReducer to create a reduce function', () => {
    reduceToTypesSync(dir);

    expect(mockDirListReducer).to.have.been.calledOnceWithExactly(
      dir,
      mockDirListMapResult,
    );
  });

  it('should use the reduce function created by dirListReducer to reduce the dirList', () => {
    reduceToTypesSync(dir);

    expect(mockDirListReduce.args).to.deep.equal([
      [mockDirListReducerResult, { directories: [], files: [] }],
    ]);
  });

  it('should return the result of the reduce', () =>
    expect(reduceToTypesSync(dir)).to.equal(mockDirListReduceResult));
});
