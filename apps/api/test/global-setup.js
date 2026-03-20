// Runs once before all test suites.
// Creates the vibrasbk_test schema and sets the DB_SCHEMA env var.
const { Client } = require('pg');

module.exports = async function () {
  process.env.DB_SCHEMA = 'vibrasbk_test';

  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'vibrasbk',
  });

  await client.connect();
  await client.query('CREATE SCHEMA IF NOT EXISTS vibrasbk_test');
  await client.end();
};
