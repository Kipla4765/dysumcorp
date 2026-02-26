import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getValidToken } from "@/lib/storage-api";
import { checkStorageLimit, getUserPlanType } from "@/lib/plan-limits";
import { applyUploadRateLimit } from "@/lib/rate-limit";
import { validateUploadToken } from "@/lib/upload-tokens";

// POST /api/portals/stream-upload - Stream upload chunk to cloud storage
export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await applyUploadRateLimit(request);
    if (rateLimitResult) {
      return rateLimitResult;
    }

    const formData = await request.formData();
    const chunk = formData.get("chunk") as Blob;
    const provider = formData.get("provider") as string;
    const uploadToken = formData.get("uploadToken") as string;

    if (!chunk || !provider || !uploadToken) {
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

    if (provider === "google") {
      // Google Drive resumable upload
      const uploadUrl = formData.get("uploadUrl") as string;
      const chunkStart = parseInt(formData.get("chunkStart") as string);
      const chunkEnd = parseInt(formData.get("chunkEnd") as string);
      const totalSize = parseInt(formData.get("totalSize") as string);

      if (!uploadUrl || isNaN(chunkStart) || isNaN(chunkEnd) || isNaN(totalSize)) {
        return NextResponse.json(
          { error: "Missing Google Drive upload parameters" },
          { status: 400 }
        );
      }

      console.log(`[Stream Upload] Google Drive chunk ${chunkStart}-${chunkEnd}/${totalSize}`);

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
        console.error(`[Stream Upload] Google Drive failed:`, uploadResponse.status, errorText);
        return NextResponse.json(
          { error: `Upload failed: ${uploadResponse.status}` },
          { status: uploadResponse.status }
        );
      }

      const isComplete = uploadResponse.status === 200 || uploadResponse.status === 201;
      
      let fileData = null;
      if (isComplete) {
        fileData = await uploadResponse.json();
        console.log(`[Stream Upload] Google Drive complete, file ID: ${fileData.id}`);
      }

      return NextResponse.json({
        success: true,
        complete: isComplete,
        fileData,
        status: uploadResponse.status,
      });

    } else if (provider === "dropbox") {
      // Dropbox upload (single request, no chunking)
      const accessToken = formData.get("accessToken") as string;
      const uploadPath = formData.get("uploadPath") as string;
      const isLastChunk = formData.get("isLastChunk") === "true";
      const chunkIndex = parseInt(formData.get("chunkIndex") as string);

      if (!accessToken || !uploadPath) {
        return NextResponse.json(
          { error: "Missing Dropbox upload parameters" },
          { status: 400 }
        );
      }

      console.log(`[Stream Upload] Dropbox chunk ${chunkIndex}, last: ${isLastChunk}`);

      const chunkBuffer = Buffer.from(await chunk.arrayBuffer());

      // For Dropbox, we accumulate chunks and upload when complete
      // This is a simplified version - for production, you'd want to use Dropbox's upload session API
      if (isLastChunk) {
        const uploadResponse = await fetch("https://content.dropboxapi.com/2/files/upload", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/octet-stream",
            "Dropbox-API-Arg": JSON.stringify({
              path: uploadPath,
              mode: "add",
              autorename: true,
              mute: false,
            }),
          },
          body: chunkBuffer,
        });

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error(`[Stream Upload] Dropbox failed:`, uploadResponse.status, errorText);
          return NextResponse.json(
            { error: `Dropbox upload failed: ${uploadResponse.status}` },
            { status: uploadResponse.status }
          );
        }

        const fileData = await uploadResponse.json();
        console.log(`[Stream Upload] Dropbox complete, file ID: ${fileData.id}`);

        return NextResponse.json({
          success: true,
          complete: true,
          fileData,
        });
      } else {
        // Chunk received, waiting for more
        return NextResponse.json({
          success: true,
          complete: false,
        });
      }

    } else {
      return NextResponse.json(
        { error: `Unsupported provider: ${provider}` },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error("[Stream Upload] Error:", error);
    return NextResponse.json(
      { error: "Failed to stream upload" },
      { status: 500 }
    );
  }
}
