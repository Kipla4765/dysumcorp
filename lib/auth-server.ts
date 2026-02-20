import { checkSubscriptionAccess } from "@creem_io/better-auth/server";
import { headers } from "next/headers";

import { auth, prisma } from "@/lib/auth";

export async function getSession() {
  return await auth.api.getSession({ headers: await headers() });
}

export async function getSessionFromRequest(request: Request) {
  return await auth.api.getSession({ headers: request.headers });
}

export async function checkUserSubscription(userId: string) {
  return await checkSubscriptionAccess(
    {
      apiKey: process.env.CREEM_API_KEY!,
      testMode: process.env.NODE_ENV === "development",
    },
    {
      database: auth.options.database,
      userId,
    },
  );
}

export { auth, prisma };
