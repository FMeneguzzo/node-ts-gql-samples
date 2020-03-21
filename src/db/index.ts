import * as usersDB from '@app/db/users.json';
import * as clientsDB from '@app/db/clients.json';
import * as productsDB from '@app/db/products.json';
import * as salesDB from '@app/db/sales.json';

import { User } from '@app/graphql/user/entities/user.entity';
import { Client } from '@app/graphql/client/entities/client.entity';
import { Product } from '@app/graphql/product/entities/product.entity';
import { Sale } from '@app/graphql/sale/entities/sale.entity';

export interface DBRecord {
  id: string;
}

// All operations are done in memory for demonstration purposes
export class DB<T extends DBRecord> {
  constructor(
    private db: T[],
  ) {}

  async get(): Promise<T[]> {
    return Promise.resolve(this.db);
  }

  async update(record: T): Promise<T> {
    const index = this.db.findIndex((dbRecord) => dbRecord.id === record.id);
    if (!~index) {
      throw new Error('Record not found');
    }
    this.db[index] = record;
    return Promise.resolve(record);
  }

  async add(newRecord: T): Promise<T> {
    const index = this.db.findIndex((dbRecord) => dbRecord.id === newRecord.id);
    if (~index) {
      throw new Error('Duplicate id');
    }
    this.db.push(newRecord);
    return Promise.resolve(newRecord);
  }

  async delete(id: string): Promise<T | null> {
    const index = this.db.findIndex((dbRecord) => dbRecord.id === id);
    return Promise.resolve(
      ~index
        ? null
        : this.db.splice(index, 1)[0]
    );
  }
}

class DBMock {
  // Suppress enum mapping TS error because DB is not going to change in this example, values mapping should be added on fetch
  // @ts-ignore
  private _users: DB<User> = new DB<User>(usersDB);
  private _clients: DB<Client> = new DB<Client>(clientsDB);
  // Suppress enum mapping TS error because DB is not going to change in this example, values mapping should be added on fetch
  // @ts-ignore
  private _products: DB<Product> = new DB<Product>(productsDB);
  private _sales: DB<Sale> = new DB<Sale>(salesDB);

  get users(): DB<User> {
    return this._users;
  }

  get clients(): DB<Client> {
    return this._clients;
  }

  get products(): DB<Product> {
    return this._products;
  }

  get sales(): DB<Sale> {
    return this._sales;
  }
}

export const dbMock: DBMock = new DBMock();