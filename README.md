In this project, we'll build a URL shortening API tailored as an in-house tool for your company. This is especially handy if you're part of a startup looking to optimize internal processes without the extra expense of third-party services. By crafting our custom solution, we gain flexibility and save on costs.

Topics Covered:

- Creating REST endpoints with CRUD functionality: Learn to set up the backbone of our URL shortener, allowing creation, reading, updating, and deletion of shortened URLs.
- Enhancing GET requests with pagination and filtering: We'll implement methods to manage large sets of shortened URLs efficiently, ensuring quick access and organization.
- Applying validation with DTOs (Data Transfer Objects) and Pipes: Understand how to ensure data integrity and valid requests within our API.
- Persisting data with database integration: Dive into how we store and manage our data reliably using a database.
- Securing our API with basic API key authentication and Guards: Explore how to protect our API from unauthorized access.
- Configuring our service using the Config module: We'll configure our API for different environments with ease and flexibility.
- Testing our application: Grasp the importance and techniques for thorough testing with unit tests, integration tests, and end-to-end tests to ensure reliability.

## Local set up

Install dependencies:

```
pnpm install
```

Copy the env example file.

```
cp .env.example .env
```

spin up the local Postgres database using this script:

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
