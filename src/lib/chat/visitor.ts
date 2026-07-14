import "server-only";
import { cookies } from "next/headers";
import { randomUUID, createHmac, timingSafeEqual } from "crypto";

/* Anonymous visitor identity. A random id is stored in an HMAC-signed,
   httpOnly cookie so a visitor keeps the same conversation across refreshes but
   cannot forge another visitor's id (the server only mints a Firestore read
   token for an id whose signature verifies). No PII. */

const COOKIE = "ecoshine_visitor";
const TTL_SECONDS = 180 * 24 * 60 * 60; // 180 days

function secret(): string {
  return process.env.AUTH_SECRET ?? "";
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function pack(id: string): string {
  return `${id}.${sign(id)}`;
}

function unpack(signed: string | undefined): string | null {
  if (!signed) return null;
  const dot = signed.lastIndexOf(".");
  if (dot < 0) return null;
  const id = signed.slice(0, dot);
  const sig = signed.slice(dot + 1);
  const expected = sign(id);
  if (expected.length !== sig.length) return null;
  try {
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return null;
  } catch {
    return null;
  }
  return id;
}

/** Read the current visitor id (verified) without creating one. */
export async function getVisitorId(): Promise<string | null> {
  const jar = await cookies();
  return unpack(jar.get(COOKIE)?.value);
}

/** Get the visitor id, creating and setting the signed cookie if absent. Must
    be called from a Server Action or Route Handler (it may set a cookie). */
export async function getOrCreateVisitorId(): Promise<string> {
  const jar = await cookies();
  const existing = unpack(jar.get(COOKIE)?.value);
  if (existing) return existing;
  const fresh = randomUUID();
  jar.set(COOKIE, pack(fresh), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TTL_SECONDS,
  });
  return fresh;
}
