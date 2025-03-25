import postgres from "postgres";

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL is not set");
}

const sql = postgres(process.env.POSTGRES_URL);

export async function createCounter() {
  await sql`CREATE TABLE IF NOT EXISTS counter (key INTEGER PRIMARY KEY, count INTEGER DEFAULT 0)`;
  await sql`INSERT INTO counter (key, count) VALUES (1, 0) ON CONFLICT (key) DO NOTHING`;
}

export async function getCount() {
  const [{ count }] = await sql`SELECT count FROM counter WHERE key = 1`;

  return count;
}

export async function incrementCount() {
  const [{ count }] = await sql`INSERT INTO counter (key, count) 
    VALUES (1, 1)
    ON CONFLICT (key)
    DO UPDATE SET count = counter.count + 1 
    RETURNING counter.count;
  `;

  return count;
}

export async function resetCount() {
  await sql`DELETE FROM counter`;
}
