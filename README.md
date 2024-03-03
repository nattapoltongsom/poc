# kpc-apps-program-x-api

> service for Firster offline store

# Migration Table

create migration sql file:

```sh
npm run db-migrate:create --message=<migration-name>
```

create migration sql file:

```sh
npm run db-migrate:create-sql --message=<migration-name>
```

update previous migration version:

```sh
npm run db-migrate:down
```

update lasted migration version:

```sh
npm run db-migrate:up
```
