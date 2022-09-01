import DataModel from './DataModel';

export interface UsersSchema {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
}

const users_table = new DataModel<UsersSchema>('users');

export {users_table};
