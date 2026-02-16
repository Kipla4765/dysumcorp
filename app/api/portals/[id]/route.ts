import { NextResponse } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

import { getSessionFromRequest } from "@/lib/auth-server";
import { PrismaClient } from "@/lib/generated/prisma/client";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// GET /api/portals/[id] - Get single portal
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await getSessionFromRequest(request);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const portal = await prisma.portal.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        files: {
          orderBy: { uploadedAt: "desc" },
          take: 10,
        },
        _count: {
          select: { files: true },
        },
      },
    });

    if (!portal) {
      return NextResponse.json({ error: "Portal not found" }, { status: 404 });
    }

    // Serialize BigInt fields
    const serializedPortal = {
      ...portal,
      maxFileSize: portal.maxFileSize.toString(),
      files: portal.files.map(file => ({
        ...file,
        size: file.size.toString(),
      })),
    };

    return NextResponse.json({ portal: serializedPortal });
  } catch (error) {
    console.error("Error fetching portal:", error);

    return NextResponse.json(
      { error: "Failed to fetch portal" },
      { status: 500 },
    );
  }
}

// PATCH /api/portals/[id] - Update portal
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await getSessionFromRequest(request);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      customDomain,
      whiteLabeled,
      primaryColor,
      textColor,
      backgroundColor,
      cardBackgroundColor,
      logoUrl,
      storageProvider,
      storageFolderId,
      storageFolderPath,
      useClientFolders,
      password,
      requireClientName,
      requireClientEmail,
      maxFileSize,
      allowedFileTypes,
      welcomeMessage,
      submitButtonText,
      successMessage,
    } = body;

    // Verify ownership
    const existingPortal = await prisma.portal.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingPortal) {
      return NextResponse.json({ error: "Portal not found" }, { status: 404 });
    }

    // Build update data object
    const updateData: any = {};
    
    // Identity
    if (name !== undefined) updateData.name = name;
    
    // Branding
    if (primaryColor !== undefined) updateData.primaryColor = primaryColor;
    if (textColor !== undefined) updateData.textColor = textColor;
    if (backgroundColor !== undefined) updateData.backgroundColor = backgroundColor;
    if (cardBackgroundColor !== undefined) updateData.cardBackgroundColor = cardBackgroundColor;
    if (logoUrl !== undefined) updateData.logoUrl = logoUrl || null;
    if (customDomain !== undefined) updateData.customDomain = customDomain || null;
    if (whiteLabeled !== undefined) updateData.whiteLabeled = whiteLabeled;
    
    // Storage
    if (storageProvider !== undefined) updateData.storageProvider = storageProvider;
    if (storageFolderId !== undefined) updateData.storageFolderId = storageFolderId;
    if (storageFolderPath !== undefined) updateData.storageFolderPath = storageFolderPath;
    if (useClientFolders !== undefined) updateData.useClientFolders = useClientFolders;
    
    // Security
    if (password !== undefined) updateData.passwordHash = password || null;
    if (requireClientName !== undefined) updateData.requireClientName = requireClientName;
    if (requireClientEmail !== undefined) updateData.requireClientEmail = requireClientEmail;
    if (maxFileSize !== undefined) updateData.maxFileSize = BigInt(maxFileSize);
    if (allowedFileTypes !== undefined) updateData.allowedFileTypes = allowedFileTypes;
    
    // Messaging
    if (welcomeMessage !== undefined) updateData.welcomeMessage = welcomeMessage || null;
    if (submitButtonText !== undefined) updateData.submitButtonText = submitButtonText;
    if (successMessage !== undefined) updateData.successMessage = successMessage;

    // Update portal
    const portal = await prisma.portal.update({
      where: { id },
      data: updateData,
    });

    // Serialize BigInt
    const serializedPortal = {
      ...portal,
      maxFileSize: portal.maxFileSize.toString(),
    };

    return NextResponse.json({ success: true, portal: serializedPortal });
  } catch (error) {
    console.error("Error updating portal:", error);

    return NextResponse.json(
      { error: "Failed to update portal" },
      { status: 500 },
    );
  }
}

// DELETE /api/portals/[id] - Delete portal
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await getSessionFromRequest(request);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership
    const existingPortal = await prisma.portal.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingPortal) {
      return NextResponse.json({ error: "Portal not found" }, { status: 404 });
    }

    // Delete portal (cascade will delete files)
    await prisma.portal.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting portal:", error);

    return NextResponse.json(
      { error: "Failed to delete portal" },
      { status: 500 },
    );
  }
}
