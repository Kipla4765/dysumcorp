import { NextRequest, NextResponse } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

import { PrismaClient } from "@/lib/generated/prisma/client";
import { verifyPassword } from "@/lib/password-utils";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// POST /api/portals/[id]/password - Verify portal password
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 },
      );
    }

    // Get portal
    const portal = await prisma.portal.findUnique({
      where: { id },
      select: {
        id: true,
        password: true,
      },
    });

    if (!portal) {
      return NextResponse.json({ error: "Portal not found" }, { status: 404 });
    }

    // No password set on portal
    if (!portal.password) {
      return NextResponse.json({ valid: true });
    }

    // Verify password
    const isValid = verifyPassword(password, portal.password);

    if (!isValid) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Error verifying portal password:", error);

    return NextResponse.json(
      { error: "Failed to verify password" },
      { status: 500 },
    );
  }
}
