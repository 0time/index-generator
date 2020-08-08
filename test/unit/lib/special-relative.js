const proxyquire = require('proxyquire').noPreserveCache().noCallThru();

const {
  d,
  expect,
  sinon: { stub },
  testRunner,
  tquire,
  uuid,
} = deps;

const me = __filename;

d(me, () => {
  const from = Symbol();
  const to = Symbol();

  let mockPath = null;
  let mockPathRelative = null;
  let mocks = null;
  let specialRelative = null;

  describe('to-be-named', () => {
    let mockPathRelativeResult = null;

    beforeEach(() => {
      mocks = {};

      mockPathRelativeResult = uuid();

      mockPathRelative = stub().returns(mockPathRelativeResult);

      mockPath = {
        relative: mockPathRelative,
      };

      mocks['path'] = mockPath;

      specialRelative = proxyquire(tquire(me, false), mocks);
    });

    it('should call path.relative with the from and to args', () => {
      specialRelative(from, to);

      expect(mockPathRelative).to.have.been.calledOnceWithExactly(from, to);
    });
  });

  [
    {
      setOfValues: ['a', 'z', 'A', 'Z', '.a', '1', '#'],
      description: (mockPathRelativeResult) =>
        `should prepend ./ for relative paths not containing it like ${mockPathRelativeResult}`,
      expected: (mockPathRelativeResult) => `./${mockPathRelativeResult}`,
    },
    {
      setOfValues: ['/', './', '../'],
      description: (mockPathRelativeResult) =>
        `should not prepend ./ for absolute or complete (containing ./) relative paths ${mockPathRelativeResult}`,
      expected: (mockPathRelativeResult) => `${mockPathRelativeResult}`,
    },
  ].forEach((config) =>
    config.setOfValues
      .map((mockPathRelativeResult) => ({
        description: config.description(mockPathRelativeResult),
        expected: config.expected(mockPathRelativeResult),
        functionToTest: (args) => {
          mocks = {};

          mockPathRelative = stub().returns(mockPathRelativeResult);

          mockPath = {
            relative: mockPathRelative,
          };

          mocks['path'] = mockPath;

          return proxyquire(tquire(me, false), mocks)(...args);
        },
        input: [from, to],
      }))
      .forEach(testRunner),
  );
});
