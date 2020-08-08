const { d, testRunner, tquire } = deps;

const me = __filename;

d(me, () => {
  const camelCase = tquire(me);

  const description = ({ expected, input }) =>
    `should convert ${input} to ${expected}`;

  [
    {
      expected: 'aCamelCaseString',
      input: 'a-camel-case-string',
    },
  ]
    .map((ea) => Object.assign({ description, functionToTest: camelCase }, ea))
    .forEach(testRunner);
});
