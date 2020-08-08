module.exports = ({ action, actionInput, condition }) => (returnValue) => {
  if (!condition) {
    return returnValue;
  }

  const actionResult = action(actionInput);

  return returnValue !== undefined ? returnValue : actionResult;
};
