import * as DataLoader from 'dataloader';

import { DB, DBRecord, dbMock } from '@app/db'

import { Sale } from '@app/graphql/sale/entities/sale.entity';

function getIdsIndexMap(ids: string[]): Map<string, number> {
  return ids.reduce((map: Map<string, number>, id: string, index: number) => {
    map.set(id, index);
    return map;
  }, new Map());
}

function mapSingleRecordsWithLoaderIds<K extends DBRecord>(
  records: Array<K>,
  ids: string[],
): Array<K> {
  const indexMap: Map<string, number> = getIdsIndexMap(ids);
  return records.reduce((result: Array<K>, record: K) => {
      const index: number | undefined = indexMap.get(record.id);
      if (index !== undefined) {
        result[index] = record;
      }
      return result;
    }, new Array<K>(ids.length).fill(null));
}

// Generic DB loader by id 
export function createDBRecordByIdLoader<K extends DBRecord>(db: DB<K>): DataLoader<string, K> {
  return new DataLoader<string, K>(async (ids: string[]) => {
    const records: K[] = await db.get();
    return mapSingleRecordsWithLoaderIds(records, ids);
  });
}

// Generic DB loader for all resources 
export function createDBRecordsLoader<K extends DBRecord>(db: DB<K>): DataLoader<true, K[]> {
  return new DataLoader<true, K[]>(async (ids: true[]) => {
    const records: K[] = await db.get();
    return new Array(ids.length).fill(records);
  });
}

// Custom loaders
function mapMultipleSalesWithCustomIdField(
  records: Array<Sale>,
  ids: string[],
  customIdField: 'clientId' | 'productId',
): Array<Array<Sale>> {
  const indexMap: Map<string, number> = getIdsIndexMap(ids);
  return records.reduce((result: Array<Array<Sale>>, record: Sale) => {
      const index: number | undefined = indexMap.get(record[customIdField]);
      if (index !== undefined) {
        result[index].push(record);
      }
      return result;
    }, new Array<Array<Sale>>(ids.length).fill([]));
}

export function createSalesByClientIdLoader(): DataLoader<string, Sale[]> {
  return new DataLoader(async (ids: string[]) => {
    const records: Sale[] = await dbMock.sales.get();
    return mapMultipleSalesWithCustomIdField(records, ids, 'clientId');
  });
}

export function createSalesByProductIdLoader(): DataLoader<string, Sale[]> {
  return new DataLoader(async (ids: string[]) => {
    const records: Sale[] = await dbMock.sales.get();
    return mapMultipleSalesWithCustomIdField(records, ids, 'productId');
  });
}