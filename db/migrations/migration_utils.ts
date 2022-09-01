import fs from 'fs';
import path from 'path';
import db from '../db';

export const getMigrationFilePath = (fileName: string) => {
  return path.join(__dirname, '.', fileName);
};

export const sqlFileToStr = (fileName: string) => {
  return fs.readFileSync(getMigrationFilePath(fileName)).toString();
};

export async function create_table({
  drop = false,
  table_name,
  file_name,
}: {
  drop: boolean;
  table_name: string;
  file_name: string;
}) {
  const result = await db.query(
    `${drop ? `DROP TABLE IF EXISTS ${table_name};` : ''} ${sqlFileToStr(
      file_name
    )}`
  );
  console.log(result);
}
