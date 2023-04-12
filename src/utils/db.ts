import knex from 'knex';
import assert from "node:assert";
import config from "../../knexfile";

const filename = process.env.DATABASE_FILENAME;
assert(filename, "DATABASE_FILENAME is not set");

const db = knex({
  client: "sqlite3",
  connection: {
    filename,
  }
});

export { db };
