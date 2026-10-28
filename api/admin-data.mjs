import { hasValidSession } from "../lib/admin-session.mjs";
import { ensureSchema, errorResponse, getSql, requireMethod, sendJson } from "../lib/db.mjs";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "GET")) return;
  try {
    if (!hasValidSession(req)) return sendJson(res, 401, { error: "unauthorized" });
    const sql = getSql();
    await ensureSchema(sql);
    const [rsvps, gifts] = await Promise.all([
      sql`SELECT id, guest_name AS name, attending, created_at AS at FROM rsvps ORDER BY created_at DESC`,
      sql`SELECT gift_id AS id, guest_name AS name, chosen_at AS at FROM gift_claims ORDER BY chosen_at DESC`,
    ]);
    return sendJson(res, 200, { rsvps, gifts });
  } catch (error) { return errorResponse(res, error); }
}
