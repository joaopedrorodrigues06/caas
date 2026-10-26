import { ensureSchema, errorResponse, getSql, requireMethod, sendJson } from "../lib/db.mjs";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  const { name, attending } = req.body || {};
  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 120 || typeof attending !== "boolean") {
    return sendJson(res, 400, { error: "invalid_input" });
  }
  try {
    const sql = getSql();
    await ensureSchema(sql);
    await sql`INSERT INTO rsvps (guest_name, attending) VALUES (${name.trim()}, ${attending})`;
    return sendJson(res, 201, { ok: true });
  } catch (error) { return errorResponse(res, error); }
}
