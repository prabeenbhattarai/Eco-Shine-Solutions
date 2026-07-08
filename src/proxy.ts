import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-session";

/* Gates every /admin route behind the signed session cookie. The login page
   itself is the only exception. Server actions re-check via requireAdmin(),
   this is the first line, not the only one. */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const secret = process.env.AUTH_SECRET;
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const ok = secret ? await verifySession(secret, token) : false;

  if (!ok) {
    const login = new URL("/admin/login", request.url);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
