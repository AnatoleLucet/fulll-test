import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";

export type Database = ReturnType<typeof drizzle<typeof schema>>;

export function createDatabase(pool: Pool): Database {
  return drizzle(pool, { schema });
}

export { schema };
