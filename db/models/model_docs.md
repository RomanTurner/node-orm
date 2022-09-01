MVC [Model View Controller] is The pattern we are following for this stack.

Models stand in as actors for the database.

DataModel is the base class other models will extend in order to create the initial crud functionality.

The naming convention is important as it is being initialized with a table name that defaults from the class name.

You can pass in a table name as an optional argument when constructing the class.


```javascript
//...Users.ts
export class Users extends DataModel {
  email?: string;
  first_name?: string;
  last_name?: string;

  constructor(table_name?: string) {
    super(table_name);
  }
}
```

The methods on DataModel need the table name write the appropriate sql statements.

```javascript
//...DataModel.ts #find
  async find(id: number, limit = 1) {
    const res = await db.query(
      `SELECT * FROM ${this.table_name} WHERE ${this.table_name}.id = $1 LIMIT $2`,
      [id, limit]
    );
    return res.rows[0];
  }
```

Fuck with it and find out, ya dig.
