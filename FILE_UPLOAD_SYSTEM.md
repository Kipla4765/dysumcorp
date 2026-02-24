# File Upload System - Structure and Flow

## Overview

The application implements a **hybrid upload system** that automatically selects the optimal upload method based on file size. This ensures efficient file uploads while avoiding Vercel's serverless function body size limits.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Client Browser                                │
│                                                                       │
│  User selects file(s)                                                │
│         │                                                            │
│         ▼                                                            │
│  ┌─────────────────────────────────────────────────┐               │
│  │           uploadManager.uploadFile()             │               │
│  └─────────────────────────────────────────────────┘               │
│         │                                                            │
│         ▼                                                            │
│  ┌─────────────────────────────────────────────────┐               │
│  │              Size Threshold Check               │               │
│  │              (4 MB threshold)                   │               │
│  └─────────────────────────────────────────────────┘               │
│         │                                                            │
│    ┌────┴────┐                                                        │
│    │         │                                                        │
│ < 4 MB    >= 4 MB                                                    │
│    │         │                                                        │
│    ▼         ▼                                                        │
│ API Upload   Direct Upload                                           │
│    │         │                                                        │
│    │    ┌────┴────────────┬─────────────────┐                       │
│    │    │                  │                 │                       │
│    ▼    ▼                  ▼                 ▼                       │
│ /portals/upload   /storage/direct-upload   Provider API             │
│    │                  │                 (Google Drive/Dropbox)       │
│    │                  │                       │                       │
│    │                  ▼                       │                       │
│    │           /storage/confirm-upload         │                       │
│    │                  │                       │                       │
│    └──────────────────┴───────────────────────┘                     │
│                           │                                          │
│                           ▼                                          │
│                    Upload Complete                                   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Upload Methods

### Method 1: API Upload (Files < 4 MB)

**When**: Files smaller than 4 MB

**Flow**:

1. Client sends file via `FormData` to `/api/portals/upload`
2. Server processes file and uploads to cloud storage
3. File metadata saved to database
4. Client receives success response

**API Route**: `app/api/portals/upload/route.ts`

**Configuration**:

```typescript
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4.5mb", // Vercel max limit
    },
  },
};
```

**Pros**:

- Simple, single request
- Fast for small files
- Server handles all storage logic

**Cons**:

- Limited by Vercel's 4.5 MB body size
- Consumes serverless execution time

---

### Method 2: Direct Upload (Files >= 4 MB)

**When**: Files 4 MB or larger

**Flow**:

```
1. Client → /api/storage/direct-upload (get presigned URL)
2. Server → Returns upload URL + metadata
3. Client → Uploads file directly to Google Drive/Dropbox
4. Client → /api/storage/confirm-upload (save metadata)
5. Server → Saves file record to database
```

**API Routes**:

- `app/api/storage/direct-upload/route.ts` - Get upload URL
- `app/api/storage/confirm-upload/route.ts` - Confirm upload

**Pros**:

- No size limits (Google Drive: 5 TB, Dropbox: 2 GB)
- Zero serverless costs for file transfer
- Better performance for large files

**Cons**:

- More complex implementation
- Requires OAuth token management

---

## Key Components

### Client-Side

| File                             | Purpose                                                    |
| -------------------------------- | ---------------------------------------------------------- |
| `lib/upload-manager.ts`          | Main upload client with `uploadFile()` and `uploadFiles()` |
| `components/storage-upload.tsx`  | Upload UI component                                        |
| `app/dashboard/portals/page.tsx` | Portal page using upload manager                           |

### Server-Side

| File                                      | Purpose                        |
| ----------------------------------------- | ------------------------------ |
| `app/api/portals/upload/route.ts`         | API upload endpoint (< 4 MB)   |
| `app/api/storage/direct-upload/route.ts`  | Get presigned upload URL       |
| `app/api/storage/confirm-upload/route.ts` | Confirm and save file metadata |
| `lib/storage/google-drive.ts`             | Google Drive integration       |
| `lib/storage/dropbox.ts`                  | Dropbox integration            |

---

## Upload Manager API

### Single File Upload

```typescript
import { uploadFile } from "@/lib/upload-manager";

const result = await uploadFile({
  file: FileObject,
  portalId: "portal-123",
  password: "optional-password",
  onProgress: (progress) => {
    console.log(`Upload: ${progress}%`);
  },
});

if (result.success) {
  console.log("Method:", result.method); // "api" or "direct"
  console.log("File:", result.file);
}
```

### Multiple Files Upload

```typescript
import { uploadFiles } from "@/lib/upload-manager";

const results = await uploadFiles(files, {
  portalId: "portal-123",
  uploaderName: "John Doe",
  uploaderEmail: "john@example.com",
  password: "optional-password",
});
```

---

## Storage Providers

### Google Drive

- **Max File Size**: 5 TB
- **API Method**: Resumable upload
- **Auth**: OAuth 2.0 with refresh tokens
- **Token Storage**: Database (`User` table)

### Dropbox

- **Max File Size**: 2 GB
- **API Method**: Direct upload
- **Auth**: OAuth 2.0 with refresh tokens
- **Token Storage**: Database (`User` table)

---

## Database Schema

### File Record

```prisma
model File {
  id          String   @id @default(cuid())
  name        String
  size        Int
  mimeType    String
  storageUrl  String
  provider    String   // "google" | "dropbox"
  portalId    String
  password    String?  // hashed
  createdAt   DateTime @default(now())
}
```

---

## Security

- **Authentication**: Required for all uploads (except public portals)
- **OAuth Tokens**: Automatically refreshed when expired
- **Password Protection**: Files can be password-protected (hashed)
- **Rate Limiting**: Prevents abuse
- **Size Validation**: Prevents storage exhaustion

---

## Configuration

### Size Threshold

**File**: `lib/upload-manager.ts`

```typescript
const SIZE_THRESHOLD = 4 * 1024 * 1024; // 4 MB
```

### API Body Limit

**File**: `app/api/portals/upload/route.ts`

```typescript
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4.5mb",
    },
  },
};
```

---

## Error Handling

| Error               | Handling                         |
| ------------------- | -------------------------------- |
| OAuth token expired | Auto-refresh using refresh token |
| Network failure     | Retry with exponential backoff   |
| Cloud API error     | Return detailed error message    |
| File too large      | Switch to direct upload method   |
| No cloud connection | Fallback to local storage        |

---

## Testing Checklist

- [ ] Upload file < 4 MB (API method)
- [ ] Upload file >= 4 MB (Direct method)
- [ ] Upload multiple files (mixed sizes)
- [ ] Verify progress tracking works
- [ ] Test error handling (network failure)
- [ ] Test with Google Drive connected
- [ ] Test with Dropbox connected
- [ ] Test password-protected uploads
- [ ] Verify file appears in portal

---

## Future Enhancements

1. **Chunked Uploads**: For files > 150 MB
2. **Resume Support**: Resume interrupted uploads
3. **Multi-Provider**: Upload to multiple clouds simultaneously
4. **Compression**: Compress files before upload
5. **Deduplication**: Check for duplicate files
