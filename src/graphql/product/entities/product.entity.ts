import { ObjectType, Field, registerEnumType } from "type-graphql";
import { DBRecord } from '@app/db';

export enum ProductTypeEnum {
  SMARTWATCH = 'SMARTWATCH',
  SMARTPHONE = 'SMARTPHONE',
  TABLET = 'TABLET',
  NOTEBOOK = 'NOTEBOOK',
}
registerEnumType(ProductTypeEnum, { name: 'ProductTypeEnum' });

@ObjectType()
export class Product implements DBRecord {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => ProductTypeEnum)
  type: ProductTypeEnum;

  @Field(() => Number)
  price: number;
}