import DataLoader from 'dataloader';
import { verifyToken } from '../utils';
import HeroDB from '../db/queryBuilders/hero';

class Hero {
  id: number;
  firstName: string;
  lastName: string;
  heroName: string;
  enemyId: number;

  constructor(data) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.heroName = data.heroName;
    this.enemyId = data.enemyId;
  }

  static getLoaders() {
    const getById = new DataLoader(ids => HeroDB.getByIds(ids));
    const primeLoaders = (heroes) => {
      heroes.forEach(hero =>
        getById.clear(hero.id).prime(hero.id, hero))
      ;
    };
    return { getById, primeLoaders };
  }

  static async load(ctx, args) {
    await verifyToken(ctx.authToken);

    if (!args.id) return null;
    const data = await ctx.dataLoaders.hero.getById.load(args.id);
    if (!data) return null;

    return new Hero(data);
  }

  static async loadAll(ctx, args) {
    await verifyToken(ctx.authToken);

    const data = await HeroDB.getAll();
    ctx.dataLoaders.hero.primeLoaders(data);

    return data.map(row => new Hero(row));
  }

}

export default Hero;
