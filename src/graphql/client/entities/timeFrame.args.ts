import { ArgsType, Field } from "type-graphql";
import { IsOptional, IsDate } from "class-validator";

@ArgsType()
export class TimeFrameArgs {
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  from?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  to?: Date;
}