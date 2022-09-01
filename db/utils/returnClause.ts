export const returnClause = (returnValues: Array<string>) => {
  const values =
    returnValues.length > 0 ? returnValues.join(', ') : returnValues[0];
  return `RETURNING ${values}`.trim();
};
