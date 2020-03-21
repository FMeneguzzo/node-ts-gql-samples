import * as DataLoader from 'dataloader';
import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';

import {
  createDBRecordByIdLoader,
  createDBRecordsLoader,
  createSalesByClientIdLoader,
  createSalesByProductIdLoader,
} from '@app/loaders';
import { dbMock } from '@app/db';

import { User } from '@app/graphql/user/entities/user.entity'; 
import { Client } from '@app/graphql/client/entities/client.entity'; 
import { Product } from '@app/graphql/product/entities/product.entity'; 
import { Sale } from '@app/graphql/sale/entities/sale.entity';

import { UserResolver } from '@app/graphql/user';
import { ClientResolver } from '@app/graphql/client';
import { ProductResolver } from '@app/graphql/product';
import { SaleResolver } from '@app/graphql/sale';

const resolvers = [
  UserResolver,
  ClientResolver,
  ProductResolver,
  SaleResolver,
];

export async function getSchema(): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers,
    validate: true,
    emitSchemaFile: './schema.graphQL',
  });
}

export class Context {
  // Generic DB loaders by id
  private _userByIdLoader: DataLoader<string, User> = createDBRecordByIdLoader(dbMock.users);
  private _clientByIdLoader: DataLoader<string, Client> = createDBRecordByIdLoader(dbMock.clients);
  private _productByIdLoader: DataLoader<string, Product> = createDBRecordByIdLoader(dbMock.products);
  private _saleByIdLoader: DataLoader<string, Sale> = createDBRecordByIdLoader(dbMock.sales);

  get userByIdLoader(): DataLoader<string, User> { return this._userByIdLoader; }
  get clientByIdLoader(): DataLoader<string, Client> { return this._clientByIdLoader; }
  get productByIdLoader(): DataLoader<string, Product> { return this._productByIdLoader; }
  get saleByIdLoader(): DataLoader<string, Sale> { return this._saleByIdLoader; }

  // Generic DB loaders
  private _clientsLoader: DataLoader<true, Client[]> = createDBRecordsLoader(dbMock.clients);
  private _productsLoader: DataLoader<true, Product[]> = createDBRecordsLoader(dbMock.products);
  private _salesLoader: DataLoader<true, Sale[]> = createDBRecordsLoader(dbMock.sales);

  get clientsLoader(): DataLoader<true, Client[]> { return this._clientsLoader; }
  get productsLoader(): DataLoader<true, Product[]> { return this._productsLoader; } 
  get salesLoader(): DataLoader<true, Sale[]> { return this._salesLoader; }

  // Custom loaders
  private _salesByClientIdLoader: DataLoader<string, Sale[]> = createSalesByClientIdLoader();
  private _salesByProductIdLoader: DataLoader<string, Sale[]> = createSalesByProductIdLoader();

  get salesByClientIdLoader(): DataLoader<string, Sale[]> { return this._salesByClientIdLoader; }
  get salesByProductIdLoader(): DataLoader<string, Sale[]> { return this._salesByProductIdLoader; }

}

export function getContext(): Context {
  return new Context();
}
