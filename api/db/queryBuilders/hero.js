// @flow
import db from '..';
import { orderByArgIdsOrder } from '../../utils';

class Hero {
  static async getById(id: number) {
    return db
    .first()
    .table('Heroes')
    .where('id', id);
  }

  static async getByIds(ids: Array<number>): Promise<Array<CostDBType>> {
    return db
    .select()
    .table('Heroes')
    .whereIn('id', ids)
    .orderByRaw(orderByArgIdsOrder(ids));
  }

  static async getAll(): Promise<Array<CostDBType>> {
    return db
    .select()
    .table('Heroes');
  }
}

export default Hero;
