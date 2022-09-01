describe('update_by_id', () => {
  test('setSyntax for SET in sql UPDATE statement', () => {
    const updatedObject = {
      email: 'sad-boy@lonely.com',
      first_name: 'real sad',
      last_name: 'bad boy',
    };

    const setSyntax = Object.keys(updatedObject)
      .map((key, i) => `${key}=$${i + 1}`)
      .join(', ');
    expect(setSyntax).toBe('email=$1, first_name=$2, last_name=$3');
  });
});

export {};

