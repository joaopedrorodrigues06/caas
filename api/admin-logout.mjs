import { clearSessionCookie } from "../lib/admin-session.mjs";
import { requireMethod, sendJson } from "../lib/db.mjs";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  res.setHeader("Set-Cookie", clearSessionCookie());
  return sendJson(res, 200, { ok: true });
}
