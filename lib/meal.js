import pool from './db.js';


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
