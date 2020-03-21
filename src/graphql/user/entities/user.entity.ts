import { ObjectType, Field, registerEnumType } from "type-graphql";
import { DBRecord } from '@app/db';

export enum UserGenderEnum {
  M = 'M',
  F = 'F',
  X = 'X',
}
registerEnumType(UserGenderEnum, { name: 'UserGenderEnum' });

@ObjectType()
export class User implements DBRecord {
  @Field(() => String)
  id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => UserGenderEnum, { nullable: true })
  gender: UserGenderEnum;
}