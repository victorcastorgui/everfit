import {
  adminProtectedRoutes,
  protectedRoutes,
  publicRoutes,
} from "@/routes/route";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  const redirectToLogin = () => {
    req.cookies.delete("token");
    req.cookies.delete("role");

    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    response.cookies.delete("token");

    return response;
  };

  if (
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) &&
    (!token || role !== "user")
  ) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return redirectToLogin();
  }

  if (
    adminProtectedRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    ) &&
    (!token || role !== "admin")
  ) {
    if (role === "user") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    return redirectToLogin();
  }

  if (publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return;
  }
}
