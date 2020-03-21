import { ArgsType, Field } from "type-graphql";

import { ProductTypeEnum } from '@app/graphql/product/entities/product.entity';

@ArgsType()
export class ProductsArgs {
  @Field(() => [ProductTypeEnum], { nullable: true })
  types?: ProductTypeEnum[];
}