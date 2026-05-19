const pg = require('pg');
const fs = require('node:fs');
const path = require('node:path');

const { Pool } = pg;

// Load .env.local when running this script from the terminal
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    process.env[key] = rest.join('=');
  }
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const sql = `
  CREATE TABLE IF NOT EXISTS meals (
    id SERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    summary TEXT NOT NULL,
    instructions TEXT NOT NULL,
    creator TEXT NOT NULL,
    creator_email TEXT NOT NULL
  );
`;

pool
  .query(sql)
  .then(() => {
    console.log('Meals table created (or already exists).');
    return pool.end();
  })
  .catch((err) => {
    console.error('Database initialization failed:', err);
    process.exit(1);
  });
