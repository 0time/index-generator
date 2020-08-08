const fs = require('fs');
const path = require('path');

const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  describe('given that there exists an index file at the root of the source directory', () => {
    const config = {
      directory: './src',
      outputFilePath: './test/integration/fixtures/generated.src.index.js',
      overwrite: true,
    };

    it('should write a file which exports that index file at the key `index`', () => {
      const index = tquire(me);

      if (fs.existsSync(config.outputFilePath)) {
        fs.unlinkSync(config.outputFilePath);
      }

      return Promise.resolve()
        .then(() => index(config))
        .then(() => {
          expect(
            require(path.resolve(process.cwd(), config.outputFilePath)),
          ).to.have.property('index', index);
        });
    });
  });
});
