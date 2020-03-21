import {
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
  Mutation,
  Args,
} from 'type-graphql';

import { dbMock } from '@app/db';
import { Context } from '@app/graphql';

import { Sale } from '@app/graphql/sale/entities/sale.entity';
import { CreateSaleArgs } from '@app/graphql/sale/entities/createSale.args';
import { Client } from '@app/graphql/client/entities/client.entity';
import { Product } from '@app/graphql/product/entities/product.entity';

@Resolver(() => Sale)
export class SaleResolver {
  @Query(() => [Sale], { description: 'Sales will be sorted by business date DESC' })
  async sales(
    @Ctx() { salesLoader }: Context,
  ): Promise<Sale[]> {
    const records = await salesLoader.load(true);
    return records.sort((a, b) => -a.businessDateTime.localeCompare(b.businessDateTime));
  }

  @Mutation(() => Sale, { nullable: true })
  async createSale(
    @Args() { input }: CreateSaleArgs,
  ): Promise<Sale> {
    return dbMock.sales.add(input);
  }

  @FieldResolver(() => Client, { nullable: true })
  async client(
    @Root() { clientId }: Sale,
    @Ctx() { clientByIdLoader }: Context,
  ): Promise<Client | null> {
    return clientByIdLoader.load(clientId);
  }

  @FieldResolver(() => Product, { nullable: true })
  async product(
    @Root() { productId }: Sale,
    @Ctx() { productByIdLoader }: Context,
  ): Promise<Product | null> {
    return productByIdLoader.load(productId);
  }
}
