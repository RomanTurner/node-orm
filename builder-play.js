// const users = [
//   [1, {email: 'tob', name: 'tob'}],
//   [2, {email: 'tob1', name: 'tob1'}],
//   [3, {email: 'tob2', name: 'tob2'}],
//   [4, {email: 'tob3', name: 'tob3'}],
// ];
// const UsersCache = new Map(users);

class DataBaseModel {
  baseQuery = '';
  query = '';
  values = [];
  result = {
    isError: null,
    message: null,
    data: [],
  };

  constructor(table_name) {
    this.table_name = table_name;
    this.baseQuery = `SELECT * FROM ${this.table_name}`;
    this.columns = ['email', 'id', 'name', 'address'];
  }

  find(id) {
    this.query = this.baseQuery;
    this.values = [id];
    return this._where('id=$1').limit(1).execute();
  }

  find_by(query) {
    return this.where(query);
  }

  limit(limit = 1) {
    this.query += ` LIMIT $${this.values.length + 1}`;
    this.values.push(limit);
    return this;
  }
  execute() {
    this.results = ['Executes query with:', [this.query, this.values]];
    this.query = '';
    this.values = [];
    return this.results;
  }
  where(query) {
    this.query = this.baseQuery;
    const cols = Object.keys(query);
    if (!cols.every(col => this.columns.includes(col))) return 'wrong buckaroo';
    this.values = Object.values(query);
    const condition = cols
      .map((el, i) => {
        if (cols.length - 1 > i) return ` ${el}=$${i + 1}`;
        return ` ${el}=$${i + 1}`;
      })
      .join(', ');
    return this._where(condition);
  }
  _where(condition) {
    if (condition === undefined) return this.query;
    this.query += ` WHERE ${condition}`;
    return this;
  }
}

const users_table = new DataBaseModel('users');
users_table.where({email: 'some'}).limit(1).execute();
