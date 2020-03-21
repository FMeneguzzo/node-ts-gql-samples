import {
  Args,
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { Context } from '@app/graphql';

import { Product } from '@app/graphql/product/entities/product.entity';
import { ProductByIdArgs } from './entities/productById.args';
import { ProductsArgs } from '@app/graphql/product/entities/products.args';
import { Sale } from '@app/graphql/sale/entities/sale.entity';

@Resolver(() => Product)
export class ProductResolver {
  @Query(() => Product, { nullable: true })
  async productById(
    @Args() { id }: ProductByIdArgs,
    @Ctx() { productByIdLoader }: Context,
  ): Promise<Product | null> {
    return productByIdLoader.load(id);
  }

  @Query(() => [Product])
  async products(
    @Args() { types }: ProductsArgs,
    @Ctx() { productsLoader }: Context,
  ): Promise<Product[]> {
    let records = await productsLoader.load(true);

    if ((types ?? []).length > 0) {
      records = records.filter((product) => types.includes(product.type));
    }

    return records;
  }

  @FieldResolver(() => [Sale], { description: "Sales will be sorted by business date DESC" })
  async sales(
    @Root() { id }: Product,
    @Ctx() { salesByProductIdLoader }: Context,
  ): Promise<Sale[]> {
    return (await salesByProductIdLoader.load(id))
      .sort((a, b) => -a.businessDateTime.localeCompare(b.businessDateTime));
  }
}
