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

async function seedMeals() {
  try {
    await pool.query(`
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
    `);

    console.log('Table created (or already exists).');

    await pool.query(`
      INSERT INTO meals (
        slug,
        title,
        image,
        summary,
        instructions,
        creator,
        creator_email
      ) VALUES
      (
        'spaghetti-bolognese',
        'Spaghetti Bolognese',
        '/images/spaghetti.jpg',
        'Classic Italian pasta with rich meat sauce.',
        '1. Boil pasta. 2. Cook meat. 3. Add sauce.',
        'John Doe',
        'john@example.com'
      ),
      (
        'chicken-biryani',
        'Chicken Biryani',
        '/images/biryani.jpg',
        'Traditional spicy chicken biryani.',
        '1. Marinate chicken. 2. Cook rice. 3. Steam.',
        'Ayesha Khan',
        'ayesha@example.com'
      )
      ON CONFLICT (slug) DO NOTHING;
    `);

    console.log('Dummy data inserted.');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedMeals();
