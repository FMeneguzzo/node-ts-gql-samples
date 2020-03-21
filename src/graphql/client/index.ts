import {
  Args,
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { Context } from '@app/graphql';

import { Client } from '@app/graphql/client/entities/client.entity';
import { ClientKPI } from '@app/graphql/client/entities/client.objects';
import { ClientsArgs, ClientsSortOptionEnum } from '@app/graphql/client/entities/clients.args';
import { ClientByIdArgs } from '@app/graphql/client/entities/clientById.args';
import { TimeFrameArgs } from '@app/graphql/client/entities/timeFrame.args';

import { Sale } from '@app/graphql/sale/entities/sale.entity';

@Resolver(() => Client)
export class ClientResolver {
  @Query(() => Client, { nullable: true })
  async clientById(
    @Args() { id }: ClientByIdArgs,
    @Ctx() { clientByIdLoader }: Context,
  ): Promise<Client | null> {
    return clientByIdLoader.load(id);
  }

  @Query(() => [Client])
  async clients(
    @Args() { start, limit, sortByName }: ClientsArgs,
    @Ctx() { clientsLoader }: Context,
  ): Promise<Client[]> {
    let records = await clientsLoader.load(true);
    switch (sortByName) {
      case ClientsSortOptionEnum.ASC:
        records = records.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case ClientsSortOptionEnum.DESC:
        records = records.sort((a, b) => -a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return records.slice(start, start + limit);
  }

  @FieldResolver(() => [Sale], { description: "Sales will be sorted by business date DESC" })
  async sales(
    @Root() { id }: Client,
    @Ctx() { salesByClientIdLoader }: Context,
  ): Promise<Sale[]> {
    return (await salesByClientIdLoader.load(id))
      .sort((a, b) => -a.businessDateTime.localeCompare(b.businessDateTime));
  }

  @FieldResolver(() => ClientKPI)
  async kpi(
    @Root() { id }: Client,
    @Args() { from, to }: TimeFrameArgs,
    @Ctx() { salesByClientIdLoader }: Context,
  ): Promise<ClientKPI> {
    const sales: Sale[] = (await salesByClientIdLoader.load(id))
      .filter((sale) =>
        (from !== undefined ? sale.businessDateTime >= from.toISOString() : true)
        && (to !== undefined ? sale.businessDateTime <= to.toISOString() : true)
      );
    return ClientKPI.calculateFromSales(sales);
  }
}
