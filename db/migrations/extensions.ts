import db from '../db';

const uuid_extension = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

export async function run_extensions() {
  const result = await db.query(uuid_extension);
  console.log(result);
}
