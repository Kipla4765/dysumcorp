import { NextResponse } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

import { PrismaClient } from "@/lib/generated/prisma/client";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const dynamic = "force-dynamic";

export async function GET() {
  const authHeader = process.env.CRON_SECRET_KEY;

  if (!authHeader) {
    return NextResponse.json(
      { error: "Cron auth not configured" },
      { status: 401 },
    );
  }

  try {
    const accounts = await prisma.account.findMany({
      where: {
        providerId: {
          in: ["google", "dropbox"],
        },
        refreshToken: {
          not: null,
        },
        accessTokenExpiresAt: {
          lte: new Date(Date.now() + 5 * 60 * 1000),
        },
      },
      select: {
        id: true,
        providerId: true,
        refreshToken: true,
      },
    });

    let refreshed = 0;
    let failed = 0;

    for (const account of accounts) {
      if (!account.refreshToken) continue;

      try {
        const provider = account.providerId as "google" | "dropbox";
        let tokenUrl: string;
        let clientId: string;
        let clientSecret: string;

        if (provider === "google") {
          tokenUrl = "https://oauth2.googleapis.com/token";
          clientId = process.env.GOOGLE_CLIENT_ID!;
          clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
        } else {
          tokenUrl = "https://api.dropboxapi.com/oauth2/token";
          clientId = process.env.DROPBOX_CLIENT_ID!;
          clientSecret = process.env.DROPBOX_CLIENT_SECRET!;
        }

        const response = await fetch(tokenUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: account.refreshToken,
            grant_type: "refresh_token",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const newAccessToken = data.access_token;
          const expiresAt = data.expires_in
            ? new Date(Date.now() + data.expires_in * 1000)
            : null;

          await prisma.account.update({
            where: { id: account.id },
            data: {
              accessToken: newAccessToken,
              accessTokenExpiresAt: expiresAt,
            },
          });

          refreshed++;
        } else {
          failed++;
        }
      } catch (error) {
        console.error(`Error refreshing token for ${account.id}:`, error);
        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      checked: accounts.length,
      refreshed,
      failed,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron token refresh error:", error);
    return NextResponse.json(
      { error: "Token refresh failed" },
      { status: 500 },
    );
  }
}
