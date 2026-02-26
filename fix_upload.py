#!/usr/bin/env python3
import re

# Read the file
with open('app/portal/[slug]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# The chunked upload code to replace (starts after the condition check)
old_code_pattern = r'''          // Google Drive direct upload \(resumable upload to Google Drive\)
          const chunkSize = uploadData\.chunkSize \|\| 4 \* 1024 \* 1024;
          const totalChunks = Math\.ceil\(file\.size / chunkSize\);
          const sessionId = `\$\{portal\.id\}-\$\{Date\.now\(\)\}-\$\{Math\.random\(\)\}`;

          console\.log\(
            `\[Upload\] Uploading \$\{file\.name\} in \$\{totalChunks\} chunks`,
          \);

          let uploadedBytes = 0;

          for \(let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex\+\+\) \{[\s\S]*?if \(!storageUrl \|\| !storageFileId\) \{
            throw new Error\(
              "Upload completed but no storage information received",
            \);
          \}'''

# New direct upload code
new_code = '''          // Google Drive direct upload (resumable upload)
          const uploadResult = await new Promise<{ id: string }>((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener("progress", (e) => {
              if (e.lengthComputable) {
                const percentComplete = Math.round((e.loaded / e.total) * 100);
                setFileProgress((prev) => ({ ...prev, [i]: percentComplete }));
              }
            });

            xhr.addEventListener("load", () => {
              console.log(`[Upload] Google Drive response status: ${xhr.status}`);
              if (xhr.status >= 200 && xhr.status < 300) {
                try {
                  const response = JSON.parse(xhr.responseText);
                  console.log(`[Upload] File uploaded, ID: ${response.id}`);
                  resolve(response);
                } catch (e) {
                  console.error(`[Upload] Parse error:`, e);
                  reject(new Error("Failed to parse upload response"));
                }
              } else {
                console.error(`[Upload] Upload failed:`, xhr.status, xhr.responseText.substring(0, 200));
                reject(new Error(`Upload failed with status ${xhr.status}`));
              }
            });

            xhr.addEventListener("error", () => {
              console.error(`[Upload] Network error`);
              reject(new Error("Network error during upload"));
            });

            console.log(`[Upload] Uploading ${file.size} bytes directly to Google Drive`);
            xhr.open("PUT", uploadData.uploadUrl);
            xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
            xhr.send(file);
          });

          storageFileId = uploadResult.id;
          storageUrl = `https://drive.google.com/file/d/${uploadResult.id}/view`;
          console.log(`[Upload] File uploaded to Google Drive: ${file.name}`);'''

# Replace
content = re.sub(old_code_pattern, new_code, content, flags=re.MULTILINE)

# Write back
with open('app/portal/[slug]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement complete!")
