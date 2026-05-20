import pool from './db.js';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs/promises';


export async function getMeals() {


//  TODO: Remove this line as we did this to error.js is working fine
//   throw new Error("SOmething went wrong");

  // Wait for 5 minutes TODO: need to remove so check in loading data takes loading screen show to user
  await new Promise((resolve) =>
    setTimeout(resolve, 1 * 60 * 100)
  );

  const result = await pool.query(
    'SELECT * FROM meals ORDER BY id'
  );


  return result.rows;
}


export async function getMeal(slug) {
  const result = await pool.query(
    'SELECT * FROM meals WHERE slug = $1 LIMIT 1',
    [slug]
  );

  return result.rows.at(0);
}


export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  await fs.writeFile(
    `public/images/${fileName}`,
    Buffer.from(bufferedImage)
  );

  meal.image = `/images/${fileName}`;

  await pool.query(
    `INSERT INTO meals (
      slug,
      title,
      image,
      summary,
      instructions,
      creator,
      creator_email
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      meal.slug,
      meal.title,
      meal.image,
      meal.summary,
      meal.instructions,
      meal.creator,
      meal.creator_email,
    ]
  );
}