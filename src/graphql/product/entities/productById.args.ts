import { ArgsType, Field } from "type-graphql";
import { IsString } from "class-validator";

@ArgsType()
export class ProductByIdArgs {
  @Field(() => String)
  @IsString()
  id: string;
}