const { d, tquire, testRunner } = deps;

const me = __filename;

d(me, () => {
  const isString = tquire(me);

  [new String('"abc"'), '"abc"']
    .map((ea) => ({
      description: ({ input }) =>
        `should detect a string for valid string types like ${input} (${typeof input})`,
      expected: true,
      input: ea,
      functionToTest: isString,
    }))
    .forEach(testRunner);

  [new Object(), {}, true, false, 0, 1]
    .map((ea) => ({
      description: ({ input }) =>
        `should not detect a string for invalid string types like ${input} (${typeof input})`,
      expected: false,
      input: ea,
      functionToTest: isString,
    }))
    .forEach(testRunner);
});
