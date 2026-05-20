# NextLevel Food

A full-stack recipe-sharing web app built with **Next.js 14** and **PostgreSQL**. Users can browse meals, view recipe details, and share their own favorite dishes with the community.

## Features

- **Home** — Landing page with community info and navigation
- **Browse Meals** — Grid of all recipes from the database (with loading UI)
- **Meal Details** — Individual recipe page by slug (e.g. `/meals/spaghetti-bolognese`)
- **Share a Meal** — Form with image upload, validated and saved via Server Actions
- **Community** — Information page for food lovers

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| UI | [React 18](https://react.dev/) |
| Database | [PostgreSQL](https://www.postgresql.org/) |
| DB client | [node-postgres (`pg`)](https://node-postgres.com/) |
| Security | [xss](https://www.npmjs.com/package/xss) — sanitizes user instructions |
| Slugs | [slugify](https://www.npmjs.com/package/slugify) — URL-friendly meal titles |

## Prerequisites

Before you start, install:

- **Node.js** 18+ ([nodejs.org](https://nodejs.org/))
- **npm** (comes with Node.js)
- **PostgreSQL** 14+ ([postgresql.org](https://www.postgresql.org/download/))

## Project Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd 05-onwards-foodies-starting-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Copy the example env file and set your database connection string:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/foodies
```

Adjust username, password, host, port, and database name to match your PostgreSQL setup.

> `.env.local` is gitignored and never committed.

## Database Setup

### 1. Create the PostgreSQL database

Open a terminal and connect to PostgreSQL:

```bash
sudo -u postgres psql
```

Inside the `psql` shell:

```sql
CREATE DATABASE foodies;
\q
```

Or in one command:

```bash
createdb foodies
```

### 2. Create the `meals` table

From the project root:

```bash
npm run init-db
```

You should see:

```text
Meals table created (or already exists).
```

This runs `initdb.js`, which creates:

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL | Primary key |
| `slug` | TEXT | Unique URL slug |
| `title` | TEXT | Meal name |
| `image` | TEXT | Path under `/images/` |
| `summary` | TEXT | Short description |
| `instructions` | TEXT | Cooking steps |
| `creator` | TEXT | Author name |
| `creator_email` | TEXT | Author email |

### 3. (Optional) Seed sample data

Add demo meals (Spaghetti Bolognese, Chicken Biryani):

```bash
npm run seed
```

Expected output:

```text
Table created (or already exists).
Dummy data inserted.
```

## Run the Project

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (hot reload) |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | ESLint |
| `npm run init-db` | Create `meals` table |
| `npm run seed` | Insert sample meals |

## Project Structure

```text
├── app/                    # Next.js App Router pages
│   ├── page.js             # Home
│   ├── community/          # Community page
│   └── meals/              # Meals list, detail, share
├── components/             # React components (header, meals grid, forms)
├── lib/
│   ├── db.js               # PostgreSQL connection pool
│   ├── meal.js             # getMeals, getMeal, saveMeal
│   └── action.js           # Server Action: shareMeal
├── public/images/          # Uploaded meal images (gitignored)
├── scripts/seed.js         # Database seed script
├── initdb.js               # Table creation script
├── docs/screenshots/       # App screenshots for this README
└── .env.example            # Env template
```

## Libraries Used

### Runtime dependencies

- **next** `14.0.3` — React framework, App Router, Server Actions, image optimization
- **react** / **react-dom** `^18` — UI rendering
- **pg** `^8.11.3` — PostgreSQL client (`Pool` for queries)
- **slugify** `^1.6.9` — Converts meal titles to URL slugs (e.g. `Chicken Biryani` → `chicken-biryani`)
- **xss** `^1.0.15` — Sanitizes HTML in user-submitted instructions

### Dev dependencies

- **eslint** / **eslint-config-next** — Linting for Next.js

### Built-in Node modules

- **node:fs/promises** — Saves uploaded images to `public/images/`

## Screenshots

### Home

![Home page](docs/screenshots/home.png)

### Browse Meals (loading)

![Meals loading](docs/screenshots/meals-loading.png)

### Browse Meals (grid)

![Meals grid](docs/screenshots/meals-grid.png)

### Meal detail

![Meal detail](docs/screenshots/meal-detail.png)

### Share a meal

![Share meal form](docs/screenshots/share-meal.png)

## How It Works

1. **Browse** — `getMeals()` in `lib/meal.js` queries PostgreSQL and renders a grid.
2. **Detail** — Dynamic route `app/meals/[slug]/page.js` calls `getMeal(slug)`.
3. **Share** — The share form uses a Server Action (`lib/action.js` → `saveMeal()`):
   - Slugifies the title
   - Sanitizes instructions with `xss`
   - Writes the image to `public/images/`
   - Inserts the row into PostgreSQL

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `connection refused` / DB errors | Ensure PostgreSQL is running and `DATABASE_URL` in `.env.local` is correct |
| `Meals table` errors | Run `npm run init-db` |
| Empty meals list | Run `npm run seed` or submit a meal via **Share Your Favorite Recipe** |
| `pg` / webpack errors with Server Actions | Import server actions from a **Server Component** page, not directly from `'use client'` files |
| Uploaded images missing after clone | `public/` is gitignored; images exist only on your machine after sharing meals |

## License

This project is for learning purposes (Next.js course material).
