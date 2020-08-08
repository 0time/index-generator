// move me to tiny-pfp

module.exports = (replacer = null, space = null) => (content) =>
  JSON.stringify(content, replacer, space);
