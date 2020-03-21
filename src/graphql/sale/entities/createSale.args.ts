import { ArgsType, Field } from "type-graphql";
import { CreateSaleInput } from "./createSale.input";

@ArgsType()
export class CreateSaleArgs {
  @Field(() => CreateSaleInput)
  input: CreateSaleInput;
}