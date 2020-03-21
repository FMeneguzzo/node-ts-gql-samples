import { ArgsType, Field, Int, registerEnumType } from "type-graphql";
import { IsInt, IsPositive, Max, Min, IsOptional, IsString } from "class-validator";

export enum ClientsSortOptionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}
registerEnumType(ClientsSortOptionEnum, { name: 'ClientsSortOptionEnum' });


@ArgsType()
export class ClientsArgs {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsInt()
  @Min(0)
  start?: number;

  @Field(() => Int, { nullable: true, defaultValue: 3 })
  @IsInt()
  @IsPositive()
  @Max(10)
  limit?: number;

  @Field(() => ClientsSortOptionEnum, { nullable: true })
  @IsOptional()
  @IsString()
  sortByName?: ClientsSortOptionEnum;
}