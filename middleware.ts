import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (!isLoggedIn && isDashboard) {
    // Use the NEXTAUTH_URL environment variable to construct the login URL
    const baseUrl = process.env.BASE_URL || req.nextUrl.origin;
    const loginUrl = new URL("/api/auth/signin", baseUrl);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);

    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};