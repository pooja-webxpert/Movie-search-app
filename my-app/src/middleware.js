import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routesUrl } from "./utils/pagesurl";
export const ProtectedRoutes = [routesUrl.myList];
export const UnprotectedRoutes = [routesUrl.signIn];

// Middleware function
export async function middleware(request) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;
  // Check if the route is protected
  const isProtectedRoute = ProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // Check if the route is UnprotectedRoutes
  const isUnprotectedRoute = UnprotectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // check if the user is authorized and token is  avaliable
  if (isUnprotectedRoute && token) {
    const redirectUrl = ProtectedRoutes[0];
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
  // check if the user is Unauthorized and token is not avaliable
  if (isProtectedRoute && !token) {
    const redirectUrl = UnprotectedRoutes[0];
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [ProtectedRoutes],
};
// taken example from these sites
/* https://next-auth.js.org/configuration/nextjs
   https://nextjs.org/docs/app/building-your-application/routing/middleware#conditional-statements
   https://www.youtube.com/watch?v=Oa0A-v_zkbk 
   https://www.franciscomoretti.com/blog/nextjs-authentication-best-practices*/

/* import { withAuth } from "next-auth/middleware";
const middleware = withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});
export default middleware;*/
