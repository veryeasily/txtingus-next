const { loadEnvConfig } = require("@next/env");

const dev = process.env.NODE_ENV !== "production";
const { DATABASE_FILENAME } = loadEnvConfig('./', dev).combinedEnv;

/**
 * @type {import('knex').Config}
 */
const config = {
    client: "sqlite3",
    connection: {
      filename: DATABASE_FILENAME,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    }
};

module.exports = config;
