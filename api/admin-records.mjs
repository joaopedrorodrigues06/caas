import { hasValidSession } from "../lib/admin-session.mjs";
import { ensureSchema, errorResponse, getSql, requireMethod, sendJson } from "../lib/db.mjs";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!hasValidSession(req)) return sendJson(res, 401, { error: "unauthorized" });

  const { action, type, id, name } = req.body || {};
  if (!['rename', 'delete'].includes(action) || !['rsvp', 'gift'].includes(type)) {
    return sendJson(res, 400, { error: "invalid_input" });
  }
  if (action === "rename" && (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 120)) {
    return sendJson(res, 400, { error: "invalid_name" });
  }
  if ((type === "rsvp" && (!Number.isSafeInteger(Number(id)) || Number(id) < 1)) ||
      (type === "gift" && (typeof id !== "string" || !/^c\d{1,2}-\d{1,3}$/.test(id)))) {
    return sendJson(res, 400, { error: "invalid_id" });
  }

  try {
    const sql = getSql();
    await ensureSchema(sql);
    let result;
    if (type === "rsvp" && action === "rename") {
      result = await sql`UPDATE rsvps SET guest_name = ${name.trim()} WHERE id = ${Number(id)} RETURNING id`;
    } else if (type === "rsvp") {
      result = await sql`DELETE FROM rsvps WHERE id = ${Number(id)} RETURNING id`;
    } else if (action === "rename") {
      result = await sql`UPDATE gift_claims SET guest_name = ${name.trim()} WHERE gift_id = ${id} RETURNING gift_id`;
    } else {
      result = await sql`DELETE FROM gift_claims WHERE gift_id = ${id} RETURNING gift_id`;
    }
    if (!result.length) return sendJson(res, 404, { error: "record_not_found" });
    return sendJson(res, 200, { ok: true });
  } catch (error) { return errorResponse(res, error); }
}
