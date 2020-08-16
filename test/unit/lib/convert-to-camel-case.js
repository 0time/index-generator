const {
  d,
  expect,
  pquire,
  sinon: { stub },
} = deps;

const me = __filename;

d(me, () => {
  const mockCamelCaseStringReplaceResult = Symbol();
  const mockStringReplaceSecondCallResult = Symbol();

  let convertToCamelCase = null;
  let mocks = null;
  let mockCamelCase = null;
  let mockCamelCaseResult = null;
  let mockCamelCaseString = null;
  let mockCamelCaseStringReplace = null;
  let mockStringReplace = null;
  let str = null;

  beforeEach(() => {
    mocks = {};

    mockCamelCaseStringReplace = stub().returns(
      mockCamelCaseStringReplaceResult,
    );

    mockCamelCaseString = {
      replace: mockCamelCaseStringReplace,
    };

    mockCamelCaseResult = mockCamelCaseString;

    mockCamelCase = stub().returns(mockCamelCaseResult);

    mocks['./camel-case'] = mockCamelCase;

    convertToCamelCase = pquire(me, mocks);

    mockStringReplace = stub();

    str = {
      replace: mockStringReplace,
    };

    mockStringReplace
      .onFirstCall()
      .returns(str)
      .onSecondCall()
      .returns(mockStringReplaceSecondCallResult);
  });

  it('should first eliminate the .js extension', () => {
    convertToCamelCase(str);

    expect(mockStringReplace.args[0]).to.deep.equal([
      convertToCamelCase.regexJsExtension,
      '',
    ]);
  });

  it('should second eliminate the forward slashes', () => {
    convertToCamelCase(str);

    expect(mockStringReplace.args[1]).to.deep.equal([
      convertToCamelCase.regexAllForwardSlashes,
      '',
    ]);
  });

  it('should call camelCase with the string no longer containing .js nor slashes', () => {
    convertToCamelCase(str);

    expect(mockCamelCase).to.have.been.calledOnceWithExactly(
      mockStringReplaceSecondCallResult,
    );
  });

  it('should third and finally eliminate the forward slashes from the camelCaseString', () => {
    convertToCamelCase(str);

    expect(mockCamelCaseStringReplace).to.have.been.calledOnceWithExactly(
      convertToCamelCase.regexAllPeriods,
      '.',
    );
  });

  it('should return the result of the camelCaseString.replace call replacing periods', () =>
    expect(convertToCamelCase(str)).to.equal(mockCamelCaseStringReplaceResult));
});
