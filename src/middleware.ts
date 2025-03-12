import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/frontend/login" || path === "/frontend/signup";
  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/frontend/login", request.nextUrl));
  }
}
export const config = {
  matcher: ["/frontend", "/frontend/login", "/frontend/profile", "/frontend/signup"],
};
