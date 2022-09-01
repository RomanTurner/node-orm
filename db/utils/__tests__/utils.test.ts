import {returnClause} from '../returnClause';
import {getQueryColumnAndProxiesFromObject} from '../getQueryColumnAndProxies';
import {sanitizeInput} from '../sanitizeQuery';
import {Users} from '../../models/Users';

describe('returnClause', () => {
  test('it returns the correct format with a single value', () => {
    const singleValue = ['id'];
    expect(returnClause(singleValue)).toBe('RETURNING id');
  });

  test('it returns the correct format with a multiple values', () => {
    const multipleValues = ['id', 'button', 'email'];
    expect(returnClause(multipleValues)).toBe('RETURNING id, button, email');
  });
});

describe('getQueryColumnAndProxiesFromObject', () => {
  test('it returns a tuple with the appropriate keys as a string', () => {
    const args = {
      email: 'big-boy@test.com',
      first_name: 'thumb',
      last_name: 'grong',
    };
    const [column_names, val_proxies] =
      getQueryColumnAndProxiesFromObject(args);
    expect(column_names).toBe('email, first_name, last_name');
    expect(val_proxies).toBe('$1, $2, $3');
  });

  test('it returns correctly with only one argument', () => {
    const args = {
      email: 'big-boy@test.com',
    };

    const [column_names, val_proxies] =
      getQueryColumnAndProxiesFromObject(args);
    expect(column_names).toBe('email');
    expect(val_proxies).toBe('$1');
  });
});

describe('sanitizeInput', () => {
  test('it filters out all unacceptable keys', () => {
    const incorrectConfig = {
      email: 'blarg@smarg.com',
      first_name: 'flogg',
      last_name: 'blarg',
      synth: 'wave',
      synt2h: 'w2ave',
    };
    const users = new Users();
    const thing = Object.getOwnPropertyNames(users).filter(
      el => el !== 'table_name'
    );
    console.log(thing, users);
    const sanitizedConfig = sanitizeInput(incorrectConfig, users);
    expect(sanitizedConfig).toHaveProperty('email', 'blarg@smarg.com');
    expect(sanitizedConfig).toHaveProperty('first_name', 'flogg');
    expect(sanitizedConfig).toHaveProperty('last_name', 'blarg');
  });

  test('it returns empty object if no matching properties', () => {
    const noMatchingProperties = {synth: 'wave', synt2h: 'w2ave'};
    const shouldBeEmpty = sanitizeInput(noMatchingProperties, new Users());
    expect(Object.entries(shouldBeEmpty)).toHaveLength(0);
  });
});
