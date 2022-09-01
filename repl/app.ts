import repl from 'repl';
import db from '../db/db';
import {users_table} from '../db/models/Users';
import {createRandomUser} from '../db/utils/randomDataGenerators';
import {generateUsers} from '../db/utils/randomDataGenerators';

const dequeue = repl.start('Dequeue=> ');
console.log(
  '\x1b[36m',
  'Welcome! \n Reminder: actions with the database are asynchronous. \n Remember to await your queries.',
  '\x1b[0m'
);

dequeue.context.users_table = users_table;
dequeue.context.user_props = createRandomUser;
dequeue.context.generateUsers = generateUsers;
// dequeue.context.companies_table = new Companies();
// dequeue.context.fake_company_props = createRandomCompany;
// dequeue.context.generateCompanies = generateCompanies;
dequeue.context.db = db;
