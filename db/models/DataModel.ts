import db from '../db';
import transaction from '../utils/transaction';
import {sanitizeQuery} from '../utils/sanitizeQuery';
import type {BaseReturn} from '../types';

export default class DataModel<T> {
  table_name: string;
  columns: Array<keyof T> | Promise<Array<keyof T>>;

  constructor(table_name: string) {
    this.table_name = table_name;
    this.columns = this.initColumns();
  }

  private async initColumns() {
    const {isError, message, data} = await this.getColumnsFromDB();
    if (isError) throw new Error(`${message}`);
    return data;
  }

  private async getColumnsFromDB(): Promise<BaseReturn<T>> {
    const sqlQuery = `SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='${this.table_name}';`;
    const result = await db.query(sqlQuery);

    if (typeof result === undefined)
      return {isError: true, message: 'Table does not exist', data: []};
    const columns = result.rows.map(el => el.column_name);
    return {isError: false, message: result.command, data: columns};
  }

  async all() {
    const res = await db.query(`SELECT * FROM ${this.table_name}`);
    return res.rows;
  }

  async find(id: number, limit = 1) {
    const res = await db.query(
      `SELECT * FROM ${this.table_name} WHERE ${this.table_name}.id = $1 LIMIT $2`,
      [id, limit]
    );
    return res.rows[0];
  }

  private getQueryColumnAndProxiesFromObject<T>(
    configObj: Omit<T, 'id'>
  ): [column_names: string, val_props: string] {
    return [
      Object.keys(configObj).join(', '),
      Object.keys(configObj)
        .map((el, i) => `$${i + 1}`)
        .join(', '),
    ];
  }

  async create(
    properties: Partial<T>,
    returnValues?: string[] | null
  ): Promise<BaseReturn<T>> {
    if (properties === undefined)
      return {
        isError: true,
        message: `You have to pass in ${this.table_name} properties to initialize.`,
        data: [],
      };

    const columns = await this.columns;
    const sanitizedProps = sanitizeQuery<T>(properties, columns);
    const values: string[] = Object.values(sanitizedProps);

    if (values.length === 0)
      return {
        isError: true,
        message: `Properties do not exist, or can not be initialized on ${this.table_name}`,
        data: [],
      };

    const [column_names, val_proxies] =
      this.getQueryColumnAndProxiesFromObject(sanitizedProps);

    const result = await transaction({
      queryText: `INSERT into ${this.table_name} (${column_names}) VALUES(${val_proxies})`,
      values,
      returning: {
        isReturning: !!returnValues && returnValues?.length > 0,
        returnValues: returnValues ?? [],
      },
    });

    if (result?.rows[0])
      return {isError: false, message: result.command, data: result.rows[0]};
    if (result?.command) {
      return {isError: false, message: result.command, data: result.rows};
    }
    return {
      isError: true,
      message: 'Transaction failed. Check Logs.',
      data: [],
    };
  }

  // async update(
  //   configObj: Record<string | 'id', string>,
  //   returning = {isReturning: false}
  // ) {
  //   const {id} = configObj;
  //   if (id) return 'Unable to update without ID';

  //   const sanitizedObj = sanitizeQuery(configObj, this);
  //   const values = Object.values(sanitizedObj);
  //   if (values.length === 0) return 'Please input valid properties.';

  //   const setSyntax = Object.keys(sanitizedObj)
  //     .map((key, i) => `${key}=$${i + 1}`)
  //     .join(', ');

  //   const queryText = `UPDATE ${this.table_name} SET ${setSyntax} WHERE id=$${
  //     values.length + 1
  //   }`;
  //   const result = await transaction({
  //     queryText,
  //     values: [...values, id],
  //     returning,
  //   });
  //   return result;
  // }

  async fucking_kill(id: string) {
    const result = await transaction({
      queryText: `DELETE FROM ${this.table_name} WHERE id=$1`,
      values: [id],
      returning: {isReturning: false, returnValues: null},
    });
    return result;
  }

  async im_from_buenos_aires_and_i_say_kill_them_all() {
    const result = await transaction({
      queryText: `DELETE FROM ${this.table_name}`,
      values: [],
      returning: {
        isReturning: false,
        returnValues: null,
      },
    });
    console.log('Come on you apes, you wanna live forever?');
    return result;
  }
}
