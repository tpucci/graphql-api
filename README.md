# [MO] Kick start a JS GraphQL 3 layers API with Apollo-server, Dataloader and Knex in 1/2 hour (~30 min)

## Owner: [Thomas Pucci](https://github.com/tpucci)

## Prerequisites (~5min)

- Have **Docker** and **Docker-compose** installed (~3min)

## Steps

### Intialise a new project

- Create and go to a new directory for the project: `mkdir graphql_formation && cd graphql_formation`
- Init a git repository: `git init`
- Create two services with Docker-compose, one postgres database and one node server:
  - For this step, notice that our final folder architecture looks like this:
  ```
  📂 graphql_formation
  ├ 📂 api
  │ └ 🗋 Dockerfile
  ├ 📂 db
  │ └ 🗋 Dockerfile
  ├ 🗋 config.env
  └ 🗋 docker-copose.yml
  ```
  - > Make sure your local 3000 port is available as we will use this port to reach our api
  - In a new `api/Dockerfile` file, write all the commands to assemble the api image:
  ```Dockerfile
  FROM node:8.1.0-alpine

  WORKDIR /usr/src/api

  EXPOSE 3000
  CMD ["yarn", "run", "serve"]
  ```
  - In a new `db/Dockerfile` file, write all the commands to assemble the db image:
  ```Dockerfile
  FROM postgres:9.6.3
  ```
  - In a new `docker-compose.yml` file, declare the two services:
  ```yml
  version: '3'
  services:
    api:
      build:
        context: ./api
      image: heroes-api
      env_file: config.env
      volumes:
        - ./api:/usr/src/api
      ports:
        - 3000:3000
      links:
        - db:db
    db:
      build:
        context: ./db
      env_file: config.env
      image: heroes-db
  ```
  - In a new `config.env` file, declare your environnement variable for these Docker containers:
  ```
  POSTGRES_USER=heroesuser
  POSTGRES_PASSWORD=heroespassword
  POSTGRES_DB=heroesdb
  PGDATA=/data
  ```
- Build these services with the command: `docker-compose build`

> **CHECK 1**: You terminal should prompt succesively these lines confirming Docker images have been built:
>
> `Successfully tagged heroes-db:latest`
>
> `Successfully tagged heroes-api:latest`

### Install nodemon and run our project

- Add this to the project .gitignore: `echo "api/node_modules" > .gitignore`
- In the `api` folder, interactively create a `package.json` file: `cd api && yarn init`
- Add `nodemon`, `babel-cli` and `babel-preset-es2015` to our dev dependencies: `yarn add nodemon babel-cli babel-preset-es2015 -D`
- In our `package.json`, write the command to launch the server:
```json
"scripts": {
  "serve": "nodemon index.js --exec babel-node"
}
```
- Create a new empty file `index.js`
- Go back to the root of the project: `cd ..`
- Run the project: `docker-compose up` 

> **CHECK 1**: You terminal should prompt the logs of the two containers together with two different colors
>
> **CHECK 2**: From another terminal, you can access the api and see the following folder structure: `ocker-compose exec api /bin/sh` then inside the container: `ls -lath`;
> ```
> total 64
> drwxrwxr-x    3 node     node        4.0K Aug  9 09:00 .
> -rw-rw-r--    1 node     node         186 Aug  9 09:00 package.json
> -rw-rw-r--    1 node     node       42.1K Aug  9 09:00 yarn.lock
> -rw-rw-r--    1 node     node           0 Aug  7 20:05 index.js
> drwxrwxr-x  138 node     node        4.0K Aug  7 20:04 node_modules
> -rw-rw-r--    1 node     node          86 Aug  7 20:03 Dockerfile
> drwxr-xr-x    3 root     root        4.0K Aug  3 11:50 ..
> ```
> Exit with: `CTRL-D`
>
> **CHECK 3**: You can access the db and prompt the PostgreSQL version: `docker-compose exec db psql -U heroesuser -d heroesdb` then inside the container: `select version()`;
> ```bash
> PostgreSQL 9.6.3 on x86_64-pc-linux-gnu, compiled by gcc (Debian 4.9.2-10) 4.9.2, 64-bit
> ```
> Exit with: `CTRL-D`


### Create a koa server

- Install koa and koa-router in our api: `cd api & yarn add koa koa-router`
- In the `index.js` file, create our server:
```js
import Koa from 'koa';
import koaRouter from 'koa-router';

const app = new Koa();
const router = new koaRouter();

router.get('/', ctx => {
  ctx.body = 'Hello World!';
});

app.use(router.routes())
app.use(router.allowedMethods());
app.listen(3000);

console.log('Server is up and running');
```

> **CHECK 1**: In your terminal which run docker-compose, you should see `Server is up and running`
>
> **CHECK 2**: Hitting `localhost:3000` should return `Hello World!`: `curl localhost:3000`

### Create a presentation layer with graphQL

- Install graphQL Server Koa: `yarn add graphql-server-koa`
- In the `index.js` file, add our `api` endpoint:
```js
```

