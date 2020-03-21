import { ObjectType, Field, Int } from "type-graphql";

import { Sale } from '@app/graphql/sale/entities/sale.entity';

@ObjectType()
export class ClientKPI {
  @Field(() => Number, { description: 'Sum of all sales value, including returns' })
  salesValue = 0;

  @Field(() => Int, { description: 'Number of products sold, returns count as -1' })
  quantity = 0;

  positiveSalesCount = 0;
  negativeSalesCount = 0;

  @Field(() => Number, { description: 'Percentage of returns on positive product sales' })
  get returnRatio(): number {
    return this.positiveSalesCount > 0
      ? this.negativeSalesCount / this.positiveSalesCount
      : 0;
  }

  static calculateFromSales(sales: Sale[]): ClientKPI {
    return sales
      .reduce((kpi: ClientKPI, sale: Sale) => {
        if (sale.value !== 0) {
          kpi.negativeSalesCount += sale.value < 0 ? 1 : 0;
          kpi.positiveSalesCount += sale.value > 0 ? 1 : 0;
          kpi.salesValue += sale.value;
          kpi.quantity += sale.value > 0 ? 1 : -1;
        }
        return kpi;
      }, new ClientKPI());
  }
}