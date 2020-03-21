import { Field, InputType } from "type-graphql";
import { Validate } from "class-validator";

@InputType()
export class CreateSaleInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  clientId: string;

  @Field(() => String)
  productId: string;

  @Field(() => String, { description: "Only accepts extended ISO 8601 format compliant date. Example: '2020-01-01T00:00:00.000Z'"})
  @Validate(
    (value: string) =>  value === new Date(value).toISOString(),
    { message: "Only accepts extended ISO 8601 format compliant date. Example: '2020-01-01T00:00:00.000Z'" }
  )
  businessDateTime: string;

  @Field(() => Number)
  value: number;
}