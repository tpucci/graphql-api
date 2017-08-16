const heroes = [
  {
    id: 0,
    firstName: 'Clark',
    lastName: 'Kent',
  },
  {
    id: 1,
    firstName: 'Bruce',
    lastName: 'Wayne',
  }
];

class Hero {
  id: number;
  firstName: string;
  lastName: string;

  constructor(data) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }

  static async load(ctx, args) {
    const data = heroes[args.id];
    if (!data) return null;

    return new Hero(data);
  }

  static async loadAll({ authToken, dataLoaders }) {
    const data = heroes;

    return data.map(row => new Hero(row));
  }

}

export default Hero;
