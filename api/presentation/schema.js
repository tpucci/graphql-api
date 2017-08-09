import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = [];


const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;