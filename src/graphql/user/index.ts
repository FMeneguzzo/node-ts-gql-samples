import {
  Args,
  FieldResolver,
  Query,
  Resolver,
  Root,
  Ctx,
} from 'type-graphql';

import { Context } from '@app/graphql';

import { User } from '@app/graphql/user/entities/user.entity';
import { UserByIdArgs } from '@app/graphql/user/entities/userById.args';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async userById(
    @Args() { id }: UserByIdArgs,
    @Ctx() { userByIdLoader }: Context,
  ): Promise<User | null> {
    return userByIdLoader.load(id);
  }

  @FieldResolver(() => String)
  fullName(
    @Root() { firstName, lastName }: User,
  ): string {
    return `${firstName} ${lastName}`;
  }
}
