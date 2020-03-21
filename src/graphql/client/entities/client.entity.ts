import { ObjectType, Field } from "type-graphql";
import { DBRecord } from '@app/db';

@ObjectType()
export class Client implements DBRecord {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}