/* eslint-disable node/no-unpublished-import */
import {users_table} from '../models/Users';
import {faker} from '@faker-js/faker';
import {CompaniesSchema} from '../models/Companies';
import {UsersSchema} from '../models/Users';

export function createRandomUser(): Omit<UsersSchema, 'id'> {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.firstName(),
    email: faker.internet.email(),
  };
}

export function createRandomCompany(): Omit<CompaniesSchema, 'id'> {
  return {
    title: faker.company.name(),
    description: faker.company.bs(),
  };
}

export const generateUsers = (amount: number) => {
  Array.from({length: amount}).forEach(async () => {
    const userProperties = createRandomUser();
    await users_table.create(userProperties);
  });
};

// const companies_table = new Companies();
// export const generateCompanies = (amount: number) => {
//   Array.from({length: amount}).forEach(async () => {
//     const companyProperties = createRandomCompany();
//     await companies_table.create(companyProperties);
//   });
// };
