export function sanitizeQuery<T>(
  configObj: Partial<T>,
  columns: Array<keyof T>
): Omit<Partial<T>, 'id'> {
  const initialObj = {} as Omit<Partial<T>, 'id'>;
  return columns.reduce((prev, curr) => {
    if (configObj[curr] === undefined) return prev;
    if (curr === 'id') return prev;
    return {...prev, [curr]: configObj[curr]};
  }, initialObj);
}
