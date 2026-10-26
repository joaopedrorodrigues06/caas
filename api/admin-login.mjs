import { createSessionCookie, passwordMatches } from "../lib/admin-session.mjs";
import { errorResponse, requireMethod, sendJson } from "../lib/db.mjs";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  try {
    if (!passwordMatches(req.body?.password)) return sendJson(res, 401, { error: "invalid_credentials" });
    res.setHeader("Set-Cookie", createSessionCookie());
    return sendJson(res, 200, { ok: true });
  } catch (error) { return errorResponse(res, error); }
}
