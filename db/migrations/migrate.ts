import {run_extensions} from './extensions';
import {create_table} from './migration_utils';

(function () {
  async function main() {
    try {
      //do db shit homie.
      run_extensions();
      create_table({
        drop: true,
        table_name: 'users',
        file_name: 'create_users.sql',
      });
      create_table({
        drop: true,
        table_name: 'companies',
        file_name: 'create_companies.sql',
      });
    } catch (error) {
      console.error(error);
    }
  }
  main();
})();

export {};
