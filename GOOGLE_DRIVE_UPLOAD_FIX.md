# Google Drive Upload 400 Error Fix

## Problem
Google Drive resumable upload is returning 400 error after file reaches 100%.

## Root Cause
The browser is not sending the `Content-Length` header, which Google Drive requires for resumable uploads.

## Solution
Add the `Content-Length` header and better error logging.

## Changes Needed in `app/portal/[slug]/page.tsx`

Find the Google Drive upload section (around line 371-391) and replace the `xhr.addEventListener("load"...)` section with:

```typescript
            xhr.addEventListener("load", () => {
              console.log(`[Upload] Google Drive response status: ${xhr.status}`);
              console.log(`[Upload] Response:`, xhr.responseText.substring(0, 500));
              
              if (xhr.status >= 200 && xhr.status < 300) {
                try {
                  const response = JSON.parse(xhr.responseText);
                  console.log(`[Upload] File ID:`, response.id);
                  resolve(response);
                } catch (e) {
                  console.error(`[Upload] Parse error:`, e);
                  reject(new Error(`Failed to parse response: ${e}`));
                }
              } else {
                console.error(`[Upload] Error:`, xhr.responseText);
                reject(new Error(`Upload failed (${xhr.status}): ${xhr.responseText}`));
              }
            });

            xhr.addEventListener("error", () => {
              console.error(`[Upload] Network error`);
              reject(new Error("Network error during upload"));
            });

            console.log(`[Upload] Uploading ${file.size} bytes to Google Drive`);
            xhr.open("PUT", uploadData.uploadUrl);
            xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
            xhr.setRequestHeader("Content-Length", file.size.toString());
            xhr.send(file);
```

## Testing
After this change:
1. Hard refresh browser (Ctrl+Shift+R)
2. Upload a file
3. Check console for detailed logs
4. File should upload successfully to Google Drive

## Alternative: Check Upload Session
The 400 error might also mean the upload session expired. The session is created in `/api/portals/direct-upload/route.ts` and should be used immediately. If there's a delay, the session might expire.

Check the console logs to see:
- Time between getting upload URL and starting upload
- The actual error message from Google Drive
