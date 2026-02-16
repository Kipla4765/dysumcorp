import { checkSubscriptionAccess } from "@creem_io/better-auth/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

/**
 * Get the current session for Server Components
 * Use this in Server Components only
 */
export async function getSession() {
  return await auth.api.getSession({ headers: await headers() });
}

/**
 * Get the current session for API Routes
 * Use this in API route handlers
 */
export async function getSessionFromRequest(request: Request) {
  return await auth.api.getSession({ headers: request.headers });
}

/**
 * Check if a user has an active subscription
 * Use this in Server Components or API routes
 */
export async function checkUserSubscription(userId: string) {
  return await checkSubscriptionAccess(
    {
      apiKey: process.env.CREEM_API_KEY!,
      testMode: process.env.NODE_ENV === "development", // Automatically switch based on environment
    },
    {
      database: auth.options.database,
      userId,
    },
  );
}

export { auth };
