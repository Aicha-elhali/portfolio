# Portfolio Backend

A Node.js/Express/Mongoose backend for the portfolio project.

## Structure

- `src/models/` — Mongoose schemas
- `src/routes/` — API routes
- `src/lib/` — DB connection
- `src/scripts/` — Seeding scripts
- `uploads/` — File uploads
- `dump/` — MongoDB export (mongodump)

## Setup

1. Copy `.env.example` to `.env` and set your environment variables.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run in development:
   ```bash
   npm run dev
   ```
