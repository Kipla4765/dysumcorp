#!/bin/bash
# Remove the chunked upload code (lines 369-432) and replace with direct upload

# Create backup
cp app/portal/[slug]/page.tsx app/portal/[slug]/page.tsx.bak2

# Delete lines 369-432 (chunked code)
sed -i '369,432d' app/portal/[slug]/page.tsx

# Insert direct upload code at line 369
sed -i '368a\          // Google Drive direct upload (resumable upload)\
          const uploadResult = await new Promise<{ id: string }>((resolve, reject) => {\
            const xhr = new XMLHttpRequest();\
\
            xhr.upload.addEventListener("progress", (e) => {\
              if (e.lengthComputable) {\
                const percentComplete = Math.round((e.loaded / e.total) * 100);\
                setFileProgress((prev) => ({ ...prev, [i]: percentComplete }));\
              }\
            });\
\
            xhr.addEventListener("load", () => {\
              console.log(`[Upload] Google Drive response status: ${xhr.status}`);\
              if (xhr.status >= 200 && xhr.status < 300) {\
                try {\
                  const response = JSON.parse(xhr.responseText);\
                  console.log(`[Upload] File uploaded, ID: ${response.id}`);\
                  resolve(response);\
                } catch (e) {\
                  console.error(`[Upload] Parse error:`, e);\
                  reject(new Error("Failed to parse upload response"));\
                }\
              } else {\
                console.error(`[Upload] Upload failed:`, xhr.status, xhr.responseText.substring(0, 200));\
                reject(new Error(`Upload failed with status ${xhr.status}`));\
              }\
            });\
\
            xhr.addEventListener("error", () => {\
              console.error(`[Upload] Network error`);\
              reject(new Error("Network error during upload"));\
            });\
\
            console.log(`[Upload] Uploading ${file.size} bytes directly to Google Drive`);\
            xhr.open("PUT", uploadData.uploadUrl);\
            xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");\
            xhr.send(file);\
          });\
\
          storageFileId = uploadResult.id;\
          storageUrl = `https://drive.google.com/file/d/${uploadResult.id}/view`;\
          console.log(`[Upload] File uploaded to Google Drive: ${file.name}`);\
' app/portal/[slug]/page.tsx

echo "Direct upload code inserted successfully"
