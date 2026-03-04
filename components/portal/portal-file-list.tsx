import { X } from "lucide-react";
import { FileTypeIcon } from "./file-type-icon";

interface FileItem {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "uploading" | "done";
}

interface PortalFileListProps {
  files: FileItem[];
  onRemove: (id: string) => void;
  onAddMore: () => void;
  primaryColor: string;
  secondaryColor?: string;
  textColor: string;
  gradientEnabled?: boolean;
  uploading?: boolean;
}

export function PortalFileList({
  files,
  onRemove,
  onAddMore,
  primaryColor,
  secondaryColor,
  textColor,
  gradientEnabled = true,
  uploading = false,
}: PortalFileListProps) {
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const gradientStyle = gradientEnabled && secondaryColor
    ? `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`
    : primaryColor;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold" style={{ color: textColor }}>
          Files to Upload{" "}
          <span
            className="ml-1 text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ background: `${primaryColor}1A`, color: primaryColor }}
          >
            {files.length}
          </span>
        </span>
        <button
          onClick={onAddMore}
          className="text-xs font-semibold hover:opacity-80 transition-colors"
          style={{ color: primaryColor }}
        >
          + Add more
        </button>
      </div>

      {files.map((f) => (
        <div
          key={f.id}
          className="flex items-center gap-3 rounded-xl px-4 py-3 bg-slate-50 border border-slate-200"
        >
          <div className="shrink-0">
            <FileTypeIcon type={f.file.type} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: textColor }}>
              {f.file.name}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-slate-400 text-xs">{formatBytes(f.file.size)}</span>
              {f.status === "uploading" && (
                <>
                  <span className="text-slate-300 text-xs">·</span>
                  <span className="text-xs font-medium" style={{ color: primaryColor }}>
                    {f.progress}%
                  </span>
                </>
              )}
            </div>
            {f.status === "uploading" && (
              <div className="mt-2 h-1.5 w-full rounded-full overflow-hidden bg-slate-200">
                <div
                  className="h-full rounded-full transition-all duration-150"
                  style={{
                    width: `${f.progress}%`,
                    background: gradientStyle,
                  }}
                />
              </div>
            )}
          </div>
          {f.status === "pending" && !uploading && (
            <button
              onClick={() => onRemove(f.id)}
              className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full hover:bg-red-50 transition-colors group"
              title="Remove file"
            >
              <X className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
