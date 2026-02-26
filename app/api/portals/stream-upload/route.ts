import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getValidToken } from "@/lib/storage-api";
import { checkStorageLimit, getUserPlanType } from "@/lib/plan-limits";
import { applyUploadRateLimit } from "@/lib/rate-limit";
import { validateUploadToken } from "@/lib/upload-tokens";

// POST /api/portals/stream-upload - Stream upload chunk to Google Drive
export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await applyUploadRateLimit(request);
    if (rateLimitResult) {
      return rateLimitResult;
    }

    const formData = await request.formData();
    const chunk = formData.get("chunk") as Blob;
    const uploadUrl = formData.get("uploadUrl") as string;
    const chunkStart = parseInt(formData.get("chunkStart") as string);
    const chunkEnd = parseInt(formData.get("chunkEnd") as string);
    const totalSize = parseInt(formData.get("totalSize") as string);
    const uploadToken = formData.get("uploadToken") as string;

    if (!chunk || !uploadUrl || isNaN(chunkStart) || isNaN(chunkEnd) || isNaN(totalSize)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate upload token
    const tokenData = validateUploadToken(uploadToken);
    if (!tokenData) {
      return NextResponse.json(
        { error: "Invalid or expired upload token" },
        { status: 401 }
      );
    }

    console.log(`[Stream Upload] Streaming chunk ${chunkStart}-${chunkEnd}/${totalSize}`);

    // Stream chunk directly to Google Drive
    const chunkBuffer = Buffer.from(await chunk.arrayBuffer());
    
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Length": chunkBuffer.length.toString(),
        "Content-Range": `bytes ${chunkStart}-${chunkEnd - 1}/${totalSize}`,
      },
      body: chunkBuffer,
    });

    if (!uploadResponse.ok && uploadResponse.status !== 308) {
      const errorText = await uploadResponse.text();
      console.error(`[Stream Upload] Failed:`, uploadResponse.status, errorText);
      return NextResponse.json(
        { error: `Upload failed: ${uploadResponse.status}` },
        { status: uploadResponse.status }
      );
    }

    // Check if upload is complete
    const isComplete = uploadResponse.status === 200 || uploadResponse.status === 201;
    
    let fileData = null;
    if (isComplete) {
      fileData = await uploadResponse.json();
      console.log(`[Stream Upload] Upload complete, file ID: ${fileData.id}`);
    } else {
      console.log(`[Stream Upload] Chunk uploaded, status: ${uploadResponse.status}`);
    }

    return NextResponse.json({
      success: true,
      complete: isComplete,
      fileData,
      status: uploadResponse.status,
    });

  } catch (error) {
    console.error("[Stream Upload] Error:", error);
    return NextResponse.json(
      { error: "Failed to stream upload" },
      { status: 500 }
    );
  }
}
