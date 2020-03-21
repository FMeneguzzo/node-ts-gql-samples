import { ArgsType, Field } from "type-graphql";
import { IsString } from "class-validator";

@ArgsType()
export class UserByIdArgs {
  @Field(() => String)
  @IsString()
  id: string;
}