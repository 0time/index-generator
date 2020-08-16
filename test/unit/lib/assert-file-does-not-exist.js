const {
  bluebird,
  d,
  expect,
  pquire,
  sinon: { stub },
  uuid,
} = deps;

const me = __filename;

d(me, () => {
  let assertFileDoesNotExist = null;
  let existsSyncMock = null;
  let filepath = null;
  let fsMock = null;
  let message = null;
  let mocks = null;

  beforeEach(() => {
    existsSyncMock = stub().returns(false);

    mocks = {};

    fsMock = { existsSync: existsSyncMock };

    mocks['fs'] = fsMock;

    assertFileDoesNotExist = pquire(me, mocks);

    filepath = `filepath-${uuid()}`;
    message = `message-${uuid()}`;
  });

  it('should call fs.existsSync with the filepath', () => {
    assertFileDoesNotExist(filepath, message);

    expect(existsSyncMock).to.have.been.calledOnceWithExactly(filepath);
  });

  it('should throw if the file does exist', () =>
    bluebird
      .try(() => existsSyncMock.returns(true))
      .then(() =>
        expect(() => assertFileDoesNotExist('/', message).to.throw()),
      ));

  it('should use the error message provided', () =>
    bluebird
      .try(() => existsSyncMock.returns(true))
      .then(() => assertFileDoesNotExist('/', message))
      .catch((err) => expect(err.message).to.equal(message)));
});
