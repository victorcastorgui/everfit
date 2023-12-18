// import { NextRequest, NextResponse } from "next/server";

// export default function middleware(req: NextRequest) {
//   let verify = req.cookies.get("role")?.value;
//   let url = req.url;

//   if (verify === "" && url.includes("/profile")) {
//     return NextResponse.redirect("http://localhost:8000/");
//   }

//   if (verify === "user" && url === "http://localhost:8000/auth/login") {
//     return NextResponse.redirect("http://localhost:8000/home");
//   }
// }

import { adminProtectedRoutes, protectedRoutes } from "@/routes/route";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token && !role) {
    req.cookies.delete("token");
    req.cookies.delete("role");
    req.cookies.delete("id");

    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    response.cookies.delete("token");

    return response;
  }

  if (adminProtectedRoutes.includes(req.nextUrl.pathname) && !token && !role) {
    req.cookies.delete("token");
    req.cookies.delete("role");
    req.cookies.delete("id");

    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    response.cookies.delete("token");

    return response;
  }
}
