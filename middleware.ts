import { auth } from "@/auth";

export default auth((req) => {
  // Temporarily disable authentication for testing
  return;
  
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);

    return Response.redirect(newUrl);
  }
})

export const config = {
  matcher: ["/schedule/role/:path*"]
}
