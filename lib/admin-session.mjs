import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "couple_session";
const lifetime = 8 * 60 * 60;

function secret() {
  if (!process.env.SESSION_SECRET) throw Object.assign(new Error("Sessão não configurada"), { status: 503 });
  return process.env.SESSION_SECRET;
}

function signature(payload) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function passwordMatches(candidate) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !process.env.SESSION_SECRET) throw Object.assign(new Error("Painel não configurado"), { status: 503 });
  if (typeof candidate !== "string") return false;
  const a = createHmac("sha256", secret()).update(candidate).digest();
  const b = createHmac("sha256", secret()).update(expected).digest();
  return timingSafeEqual(a, b);
}

export function createSessionCookie() {
  const payload = String(Math.floor(Date.now() / 1000) + lifetime);
  const value = `${payload}.${signature(payload)}`;
  return `${COOKIE}=${value}; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=${lifetime}`;
}

export function hasValidSession(req) {
  const raw = req.headers.cookie || "";
  const value = raw.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  if (!value) return false;
  const [payload, supplied] = value.split(".");
  if (!payload || !supplied || !/^\d+$/.test(payload) || Number(payload) <= Math.floor(Date.now() / 1000)) return false;
  const expected = Buffer.from(signature(payload));
  const actual = Buffer.from(supplied);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function clearSessionCookie() {
  return `${COOKIE}=; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}
