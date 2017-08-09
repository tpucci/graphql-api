import Koa from 'koa';
import koaRouter from 'koa-router';
import { graphqlKoa } from 'graphql-server-koa';

import schema from 'presentation/schema';

const app = new Koa();
const router = new koaRouter();

router.get('/', ctx => {
  ctx.body = 'Hello World!';
});

router.post(
  '/api',
  graphqlKoa(async ctx => {
    return {
      schema: schema,
      context,
      debug: true,
    };
  })
);

app.use(router.routes())
app.use(router.allowedMethods());
app.listen(3000);

console.log('Server is up and running');