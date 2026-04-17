#!/usr/bin/env node

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { runCLI, createCLIContainer } from "./Infra/CLI/index.js";
import { createDrizzleRepositories } from "./Infra/Persistence/index.js";
import * as schema from "./Infra/Persistence/Drizzle/schema.js";
import { dbConfig } from "./Infra/Persistence/Drizzle/config.js";

async function main() {
  const pool = new Pool(dbConfig);

  const db = drizzle(pool, { schema });

  const { fleetRepository, vehicleRepository } = createDrizzleRepositories(db);
  const container = createCLIContainer(fleetRepository, vehicleRepository);

  try {
    await runCLI({ container }, process.argv.slice(2));
  } finally {
    await pool.end();
  }
}

main();
