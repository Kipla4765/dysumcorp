# Implementation Plan: Portal & Storage Fixes

## Overview

This document outlines the implementation plan for fixing various issues in the portal creation/editing system and storage integration.

---

## Issue #1: Folder Creation Redirects Out of Page

**Problem**: When creating a folder in the storage section during portal creation/editing, the page redirects away unexpectedly.

**Location**:

- `app/dashboard/portals/create/page.tsx` - `handleCreateFolder()` function (lines 263-295)
- `app/dashboard/portals/[id]/edit/page.tsx` - similar function

**Root Cause**: The folder creation API call may be triggering a redirect or the component is re-rendering incorrectly.

**Fix Plan**:

```
1. Check if the folder creation API returns a redirect
2. Ensure no router.push() is called after successful folder creation
3. Add proper state management to keep user on the same page
4. Verify the fetchFolders() call after creation doesn't cause issues
```

**Implementation**:

- In `handleCreateFolder()` function, remove any unintended redirects
- Ensure `setIsCreatingFolder(false)` and folder navigation happen without page change

---

## Issue #2: Storage Reconnection & Token Refresh

**Problem**:

1. Create/edit portal pages show "reconnect storage" message and redirect to storage page
2. Storage page doesn't refresh OAuth tokens automatically on expiry
3. Background job needed to refresh tokens

**Locations**:

- `app/dashboard/storage/page.tsx` (lines 22-51)
- `app/api/storage/connections/route.ts`

### Part 2A: Auto-Refresh Tokens on Page Load

**Fix Plan**:

```
1. Create a new API endpoint /api/storage/refresh-tokens
2. Call this endpoint on storage page mount
3. Update the connections check to retry with refreshed tokens
```

**Implementation**:

- Add token refresh logic to storage page `useEffect`
- Call refresh before checking connection status

### Part 2B: Background Token Refresh Job

**Fix Plan**:

```
1. Create a Vercel cron job or API route for token refresh
2. Check token expiry dates in the database
3. Use refresh tokens to get new access tokens
4. Update the database with new tokens
```

**Implementation**:

- Create `app/api/cron/refresh-tokens/route.ts`
- Set up cron schedule in `vercel.json`

---

## Issue #3: Remove View Portal Button on Final Step

**Problem**: The "View Portal" button appears on the messaging (final) step during portal creation/editing.

**Location**:

- `app/dashboard/portals/create/page.tsx` - lines 2125-2139
- `app/dashboard/portals/[id]/edit/page.tsx` - similar location

**Fix Plan**:

```
1. Find the "View Portal" button in the messaging section
2. Remove or conditionally hide it on the final step
3. The button should only show after portal is created, not during creation
```

**Implementation**:

```tsx
// In the messaging section, remove or hide the View Portal button
// The button should only be available after successful creation
// Currently it's shown before creation which is incorrect
```

---

## Issue #4: Unify Folder Selection & Remove Default Path Section

**Problem**:

1. Google Drive and Dropbox foldering implementations differ
2. Default folder path section should be integrated into navigation tree

**Location**:

- `app/dashboard/portals/create/page.tsx` - StorageSection component (lines 132-756)
- `app/dashboard/portals/[id]/edit/page.tsx` - similar

### Part 4A: Unify Google Drive & Dropbox Foldering

**Current State**:

- Google Drive uses folder path: "dysumcorp/portal name/clientname"
- Dropbox uses different path structure

**Fix Plan**:

```
1. Standardize the folder path format for both providers
2. Use consistent naming: Dysumcorp / {portalName} / {clientName if selected}
3. Update the breadcrumb display to show unified format
```

### Part 4B: Integrate Default Path into Navigation Tree

**Current UI**:

```
Navigation Tree    New Folder
My Drive

[Default Upload Path: dysumcorp/portal name]
```

**Desired UI**:

```
Navigation Tree    New Folder
Dysumcorp / portal name / clientname(if selected)
```

**Implementation**:

```tsx
// In StorageSection, modify the breadcrumb to show:
// Dysumcorp / {portalName} / {clientName} (if useClientFolders is true)

// Remove the separate "Default Upload Path" display (lines 714-732)
// Integrate this into the breadcrumb navigation instead
```

---

## Issue #5: Load Storage on Page Entry (Not on Section Open)

**Problem**: Storage accounts and folders only load when user navigates to the Storage section, not when the page first loads.

**Location**:

- `app/dashboard/portals/create/page.tsx` - main component (line 1018)
- `app/dashboard/portals/[id]/edit/page.tsx`

**Fix Plan**:

```
1. Move storage initialization from StorageSection to main page component
2. Fetch accounts and initialize storage on page mount
3. Pass loaded data to StorageSection as props
```

**Implementation**:

```tsx
// In CreatePortalPage / EditPortalPage:

// Add state for storage data at page level
const [storageAccounts, setStorageAccounts] = useState<ConnectedAccount[]>([]);
const [storageInitialized, setStorageInitialized] = useState(false);

// Fetch on page mount
useEffect(() => {
  fetchStorageAccounts();
}, []);

// Pass to StorageSection
<StorageSection
  accounts={storageAccounts}
  onAccountsLoaded={setStorageAccounts}
  // ... other props
/>;
```

---

## Issue #6: File Types Not Going Through (.md etc)

**Problem**: File types like .md (markdown) aren't uploading despite being selected in the file type list.

**Location**:

- `app/dashboard/portals/create/page.tsx` - FILE_TYPE_OPTIONS (lines 767-787)
- Security section file type check logic

**Current File Types**:

```tsx
const FILE_TYPE_OPTIONS = [
  { label: "Images (JPG, PNG, GIF)", value: "image/*" },
  {
    label: "Documents (PDF, DOC)",
    value: "application/pdf,application/msword...",
  },
  { label: "Spreadsheets (XLS, CSV)", value: "..." },
  { label: "Archives (ZIP, RAR)", value: "..." },
  { label: "Videos (MP4, MOV)", value: "video/*" },
  { label: "Audio (MP3, WAV)", value: "audio/*" },
  { label: "Text/Code Files (TXT, MD, JS)", value: "text/*" },
];
```

**Root Cause**: The `text/*` MIME type may not match `.md` files properly, or the file validation on upload doesn't handle these correctly.

**Fix Plan**:

```
1. Add explicit MIME types for additional file types
2. Add extension-based validation alongside MIME type validation
3. Ensure upload API accepts these file types
```

**Implementation**:

```tsx
// Update FILE_TYPE_OPTIONS to include explicit extensions
const FILE_TYPE_OPTIONS = [
  // ... existing
  {
    label: "Text/Code Files (TXT, MD, JS, JSON, HTML, CSS)",
    value:
      "text/*,application/javascript,application/json,text/html,text/css,.md,.txt,.js,.json,.html,.css",
  },
];

// OR create a more comprehensive file type system:
// Add extension-based matching in upload validation
```

---

## Issue #7: Clients Page Not Showing Data

**Problem**: The clients page doesn't display any client data.

**Location**: `app/dashboard/clients/page.tsx`

**Root Cause Analysis**:

1. API endpoint `/api/clients` may not be returning data
2. Client data may not be populated in the database
3. The filtering logic may be incorrect

**Fix Plan**:

```
1. Check /api/clients endpoint implementation
2. Verify database queries for client aggregation
3. Check if PortalClient records exist
4. Verify file-to-client linking logic
```

**Implementation Steps**:

1. First, check what `/api/clients` returns:

   ```bash
   curl http://localhost:3000/api/clients
   ```

2. Check database for client records:

   ```bash
   # In prisma schema, check for PortalClient model
   ```

3. Fix the API route or data aggregation as needed

---

## Implementation Order

| #   | Issue                     | Priority | Estimated Effort |
| --- | ------------------------- | -------- | ---------------- |
| 1   | Folder creation redirect  | High     | 1 hour           |
| 2   | Storage token refresh     | High     | 3 hours          |
| 3   | Remove View Portal button | Medium   | 30 min           |
| 4   | Unify folder selection    | Medium   | 2 hours          |
| 5   | Load storage on entry     | High     | 1 hour           |
| 6   | File types fix            | Medium   | 1 hour           |
| 7   | Clients page data         | High     | 2 hours          |

---

## Files to Modify

1. `app/dashboard/portals/create/page.tsx`
2. `app/dashboard/portals/[id]/edit/page.tsx`
3. `app/dashboard/storage/page.tsx`
4. `app/dashboard/clients/page.tsx`
5. `app/api/storage/connections/route.ts` (new or modify)
6. `app/api/cron/refresh-tokens/route.ts` (new)
7. `vercel.json` (add cron job)
8. `lib/upload-manager.ts` (if file type validation is there)

---

## Testing Checklist

- [ ] Create folder in portal creation flow - stays on page
- [ ] Storage page auto-refreshes tokens on load
- [ ] View Portal button hidden during creation
- [ ] Folder path shows "Dysumcorp/portalName/clientName" format
- [ ] Storage loads immediately on page entry
- [ ] .md files upload successfully
- [ ] Clients page shows data after fix
