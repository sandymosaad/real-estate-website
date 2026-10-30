import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest): NextResponse {
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const session = request.cookies.get("assiut_admin_session");
    if (!session) return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
