import { ObjectType, Field } from "type-graphql";
import { DBRecord } from '@app/db';

@ObjectType()
export class Sale implements DBRecord {
  @Field(() => String)
  id: string;

  @Field(() => String)
  clientId: string;

  @Field(() => String)
  productId: string;

  @Field(() => String)
  businessDateTime: string;

  @Field(() => Number)
  value: number;
}