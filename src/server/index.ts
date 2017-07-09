import express from 'express';
import graphqlHTTP from 'express-graphql';
import buildSchema from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import schemaConfiguration from './graphql';

console.log(schemaConfiguration);
const logger = { log: (e) => console.log(e) };

const jsSchema = makeExecutableSchema({
  typeDefs: schemaConfiguration.typeDefs,
  resolvers: schemaConfiguration.resolvers,
  logger
});
/*
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);
*/
const root = { hello: () => 'Hello world!' };

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: jsSchema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
