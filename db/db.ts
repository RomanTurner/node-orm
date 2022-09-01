import {Pool, QueryResult} from 'pg';

const pool = new Pool({
  host: 'localhost',
  database: 'dequeue_db',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const db = {
  async query(text: string, params?: any): Promise<QueryResult> {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', {
      text,
      duration: duration + ' ms',
      rows: res.rowCount,
    });
    return res;
  },
  async getClient() {
    const client = await pool.connect();
    return client;
  },
};

export default db;
