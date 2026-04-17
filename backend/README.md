# Fulll backend assignment

## Tech Stack

- **ESM Typescript** - following modern standard and the ecosystem shift towards ESM.
- **Drizzle** - for type-safe SQL queries with minimal overhead.
- **Cucumber** - for gherkin-based BDD tests.
- **Vitest** - for unit test (could have more coverage, but i didn't want to clutter the assignment).
- **Oxc tools** - for fast linting and formatting (could also add madge for cyclic deps and cspell for typos).
- **GitHub Action** - for the CI.

## Usage

```bash
# install
pnpm install

# run tests
pnpm test

# database setup (make sure you have a PG running)
cp .env.dist .env  # edit with your creds
pnpm db:generate
pnpm db:migrate

# cli (auto-migrates database on first run)
pnpm dev:cli create user-123
pnpm dev:cli register-vehicle fleet-1 ABC-123
pnpm dev:cli localize-vehicle fleet-1 ABC-123 48.8566 2.3522

# build cli
pnpm build:cli

# run bundled cli
./dist/cli.js create user-123
```

<details>
<summary>Postgres setup</summary>

```bash
docker run -d \
  --name fleet-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=fleet_management \
  -p 5432:5432 \
  postgres:15-alpine
```

</details>
