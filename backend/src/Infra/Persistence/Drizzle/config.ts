export const dbConfig = {
  // would probably use something like envsafe to assert the values instead
  host: process.env["DB_HOST"] || "localhost",
  port: parseInt(process.env["DB_PORT"] || "5432"),
  database: process.env["DB_NAME"] || "fleet_management",
  user: process.env["DB_USER"] || "postgres",
  password: process.env["DB_PASSWORD"] || "password",

  ssl: false, // just for the assignment too obsly.
};
