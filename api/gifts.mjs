import { ensureSchema, errorResponse, getSql, requireMethod, sendJson } from "../lib/db.mjs";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return sendJson(res, 405, { error: "method_not_allowed" });
  }
  try {
    const sql = getSql();
    await ensureSchema(sql);
    if (req.method === "GET") {
      const rows = await sql`SELECT gift_id AS id, guest_name AS name, chosen_at AS at FROM gift_claims ORDER BY chosen_at DESC`;
      return sendJson(res, 200, { gifts: rows });
    }
    const { giftId, guestName } = req.body || {};
    if (typeof giftId !== "string" || !/^c\d{1,2}-\d{1,3}$/.test(giftId) || typeof guestName !== "string" || guestName.trim().length < 2 || guestName.trim().length > 120) {
      return sendJson(res, 400, { error: "invalid_input" });
    }
    try {
      await sql`INSERT INTO gift_claims (gift_id, guest_name) VALUES (${giftId}, ${guestName.trim()})`;
    } catch (error) {
      if (error?.code === "23505") return sendJson(res, 409, { error: "gift_already_claimed" });
      throw error;
    }
    return sendJson(res, 201, { ok: true });
  } catch (error) { return errorResponse(res, error); }
}
