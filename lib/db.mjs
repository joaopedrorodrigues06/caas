import { neon } from "@neondatabase/serverless";

let setup;

export function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
  if (!url) throw Object.assign(new Error("Banco PostgreSQL não configurado"), { status: 503 });
  return neon(url);
}

export async function ensureSchema(sql = getSql()) {
  if (!setup) {
    setup = Promise.all([
      sql`CREATE TABLE IF NOT EXISTS rsvps (
        id BIGSERIAL PRIMARY KEY,
        guest_name TEXT NOT NULL CHECK (length(trim(guest_name)) BETWEEN 2 AND 120),
        attending BOOLEAN NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`,
      sql`CREATE TABLE IF NOT EXISTS gift_claims (
        gift_id TEXT PRIMARY KEY,
        guest_name TEXT NOT NULL CHECK (length(trim(guest_name)) BETWEEN 2 AND 120),
        chosen_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`,
    ]).catch((error) => { setup = undefined; throw error; });
  }
  await setup;
}

export function sendJson(res, status, body) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.status(status).json(body);
}

export function requireMethod(req, res, method) {
  if (req.method === method) return true;
  res.setHeader("Allow", method);
  sendJson(res, 405, { error: "method_not_allowed" });
  return false;
}

export function errorResponse(res, error) {
  console.error("API error:", error?.message || "unknown");
  sendJson(res, error?.status || 500, { error: error?.status === 503 ? "database_not_configured" : "server_error" });
}
