// Runs once after all test suites.
// Drops the vibrasbk_test schema entirely.
const { Client } = require('pg');

module.exports = async function () {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'vibrasbk',
  });

  await client.connect();
  await client.query('DROP SCHEMA IF EXISTS vibrasbk_test CASCADE');
  await client.end();
};
