The starter repo serves as an excellent foundation for a NestJS project!

Here’s what’s included in the starter repos:

- Adding to the tsconfig.json file
- Setting up the ConfigModule and environment variables for Jest
- Enforcing consistent HTTP response structure
- Configuring some basic HTTP security
- Adding whitelisted validation to the NestJS server
- Setting up NestJS logging
- Docker compose set up for a Postgres database & Redis
- Prisma setup (the ORM we’ll be using in each project to interact with the database)
- Redis and CacheService setup
- Jest config (including env variables)
- Setting up a CI Pipeline using Github Actions

Here's how to get started with the repo:

## Cloning the repo

Follow these steps to get started:

1. Go to the [NestJS Starter Github repo](https://github.com/tomwray13/nestjs-starter)
2. Press the Use this template button
3. Follow the steps to create a new Github repo from the template
4. Git clone your new repo onto your local machine. For example:

```
git clone git@github.com:tomwray13/url-shortener.git
```

Checkout into your new repo and follow the steps below:

## Local set up

Install dependencies:

```
pnpm install
```

Copy the env example file.

```
cp .env.example .env
```


The NestJS server has 2 Docker Compose files. In both file, you need to update the name of the containers and networks where it says `# Needs updating`.

For example, here's an updated `docker-compose.yml` file for a project called "Url Shortener":

```yml
version: '3.8'

services:
  postgres_url_shortener: # Updated
    image: postgres:alpine
    container_name: postgres_url_shortener # Updated
    restart: always
    env_file:
      - .env
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis_url_shortener: # Updated
    image: redis:alpine
    container_name: redis_url_shortener # Updated
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

networks:
  default:
    name: url_shortener # Updated

volumes:
  postgres_data:
  redis_data:
```

Make sure you remember to also update the `docker-compose-test.yml` file!

This repo comes with a default `User` model out of the box defined in the `/apps/backend/src/database/prisma.schema` file:

```json
model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

Before you can run the local server, you need to apply this migration to your local Postgres database.

Make sure on your local machine you don't have any existing Docker containers running that would cause a conflict.

Then spin up the local Postgres database using this script:

```shell
pnpm docker:start
```

Then run this script to apply the migration to your local Postgres database:

```shell
pnpm db:migrate:dev
```

And that's it!

You can now spin up your local server with this script:

```shell
pnpm start:dev
```
