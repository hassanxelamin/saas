import {
  authMiddleware as clerkAuthMiddleware,
  clerkClient,
} from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

// Define the Clerk middleware function
const clerkAuth = clerkAuthMiddleware({
  publicRoutes: [
    '/',
    '/admin',
    '/api/',
    '/api/webhooks/clerk',
    '/api/webhooks/stripe',
    '/api/get-subscription',
    '/api/create-checkout-session',
    '/api/create-subscription',
    '/subscribe',
  ],
  afterAuth: async (auth, req) => {
    const noRedirectRoutes = ['/api/create-subscription', '/another-route'];

    // If the user is not authenticated or if the request is for a public route, allow it to proceed
    if (!auth.userId || auth.isPublicRoute) {
      return NextResponse.next();
    }

    // If the request is for a route that should not redirect when the user is not subscribed, allow it to proceed
    if (noRedirectRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.next();
    }

    // If the user is authenticated, fetch their details from Clerk
    const clerkUser = await clerkClient.users.getUser(auth.userId);

    // If the user is not subscribed or if the isSubscribed attribute is not set, redirect them to the subscription page
    if (
      !clerkUser.privateMetadata?.isSubscribed ||
      clerkUser.privateMetadata?.isSubscribed === 'false'
    ) {
      const subscribeUrl = new URL('/subscribe', req.url);
      return NextResponse.redirect(subscribeUrl);
    }

    // For non-authenticated requests or subscribed users, proceed as normal
    return NextResponse.next();
  },
});

// CORS middleware function
async function corsMiddleware(req: NextRequest) {
  // Get the response from the Clerk middleware
  const response = await clerkAuth(req, undefined as any);

  // If the response from the Clerk middleware is a NextResponse, add the CORS headers
  if (response instanceof NextResponse) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  // Return the response
  return response;
}

export default corsMiddleware;

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
