import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/*
Middleware allows you to run code before a request is completed. Then, based on the 
incoming request, you can modify the response by rewriting, redirecting, modifying 
the request or response headers, or responding directly.
*/

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //Get path from URL
  const path = request.nextUrl.pathname;

  //Public path ? true : false
  const isPublic =
    path == "/login" || path == "/signup" || path == "/verifyemail";

  //Get token from user cookies
  const token = request.cookies.get("token")?.value || "";

  //user is on /login or /signup but he has token ==> redirect to /profile
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  //user is on /profile but he don't have token ==> redirect to /login
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup", "/verifyemail"],
};
