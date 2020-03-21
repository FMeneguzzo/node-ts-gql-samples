import { ArgsType, Field } from "type-graphql";
import { IsString } from "class-validator";

@ArgsType()
export class ClientByIdArgs {
  @Field(() => String)
  @IsString()
  id: string;
}