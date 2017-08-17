import Koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import graphiql from 'koa-graphiql';
import { graphqlKoa } from 'graphql-server-koa';

import { parseAuthorizationHeader } from './utils';

import schema from './presentation/schema';
import Hero from './business/hero';

const app = new Koa();
const router = new koaRouter();

app.use(koaBody());

router.get('/', ctx => {
  ctx.body = 'Hello World!';
});

router.get('/graphiql', graphiql(async (ctx) => {
  return {
    url: '/api',
  };
}));

router.post(
  '/api',
  graphqlKoa(async ctx => {
    return {
      schema: schema,
      context: {
        authToken: parseAuthorizationHeader(ctx.req),
        dataLoaders: {
          hero: Hero.getLoaders(),
        }
      },
      debug: true,
    };
  })
);

app.use(router.routes())
app.use(router.allowedMethods());
app.listen(3000);

console.log('Server is up and running');