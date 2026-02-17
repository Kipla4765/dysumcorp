"use client";

import { useState, useEffect, useRef, forwardRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "border-border z-10 flex size-16 items-center justify-center rounded-full border-2 bg-white p-4 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

function AnimatedBeamMultipleOutputDemo({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex h-[650px] w-full items-center justify-center overflow-hidden p-10",
        className,
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-2xl flex-row items-stretch justify-between gap-16">
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <Icons.googleDrive />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.googleDocs />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.whatsapp />
          </Circle>
          <Circle ref={div4Ref}>
            <Icons.messenger />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.notion />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16">
            <Icons.openai />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <Icons.user />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
      />
    </div>
  );
}

const Icons = {
  notion: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z"
        fill="#ffffff"
      />
      <path
        d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z"
        fill="#000000"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
  openai: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  googleDrive: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 87.3 78"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
        fill="#0066da"
      />
      <path
        d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
        fill="#00ac47"
      />
      <path
        d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
        fill="#ea4335"
      />
      <path
        d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
        fill="#00832d"
      />
      <path
        d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
        fill="#2684fc"
      />
      <path
        d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
        fill="#ffba00"
      />
    </svg>
  ),
  whatsapp: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 175.216 175.552"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
        fill="#b3b3b3"
      />
      <path
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
        fill="#57d163"
      />
      <path
        d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
        fill="#ffffff"
        fillRule="evenodd"
      />
    </svg>
  ),
  googleDocs: () => (
    <svg
      width="24"
      height="32"
      viewBox="0 0 47 65"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z"
        id="path-1"
        fill="#4285F4"
      />
      <path
        d="M11.75,47.2727273 L35.25,47.2727273 L35.25,44.3181818 L11.75,44.3181818 L11.75,47.2727273 Z M11.75,53.1818182 L29.375,53.1818182 L29.375,50.2272727 L11.75,50.2272727 L11.75,53.1818182 Z M11.75,32.5 L11.75,35.4545455 L35.25,35.4545455 L35.25,32.5 L11.75,32.5 Z M11.75,41.3636364 L35.25,41.3636364 L35.25,38.4090909 L11.75,38.4090909 L11.75,41.3636364 Z"
        fill="#F1F1F1"
      />
    </svg>
  ),
  messenger: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="url(#8O3wK6b5ASW2Wn6hRCB5xa_YFbzdUk7Q3F8_gr1)"
        d="M44,23.5C44,34.27,35.05,43,24,43c-1.651,0-3.25-0.194-4.784-0.564c-0.465-0.112-0.951-0.069-1.379,0.145L13.46,44.77C12.33,45.335,11,44.513,11,43.249v-4.025c0-0.575-0.257-1.111-0.681-1.499C6.425,34.165,4,29.11,4,23.5C4,12.73,12.95,4,24,4S44,12.73,44,23.5z"
      />
      <path
        fill="#ffffff"
        d="M34.394,18.501l-5.7,4.22c-0.61,0.46-1.44,0.46-2.04,0.01L22.68,19.74c-1.68-1.25-4.06-0.82-5.19,0.94l-1.21,1.89l-4.11,6.68c-0.6,0.94,0.55,2.01,1.44,1.34l5.7-4.22c0.61-0.46,1.44-0.46,2.04-0.01l3.974,2.991c1.68,1.25,4.06,0.82,5.19-0.94l1.21-1.89l4.11-6.68C36.434,18.901,35.284,17.831,34.394,18.501z"
      />
    </svg>
  ),
  user: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

function StatCard({
  value,
  label,
  delay = 0,
  className = "",
}: {
  value: string;
  label: string;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`stat-card ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function PortalPreview() {
  const files = [
    { name: "Contract_2024.pdf", size: "2.4 MB", icon: "📄", color: "#e8f4fd" },
    {
      name: "Project_Brief.docx",
      size: "840 KB",
      icon: "📝",
      color: "#f0fdf4",
    },
    { name: "Photo_ID.jpg", size: "1.1 MB", icon: "🖼️", color: "#fdf4ff" },
  ];

  return (
    <div className="portal-preview">
      <div className="portal-header">
        <div className="portal-dots">
          <span style={{ background: "#ff5f57" }} />
          <span style={{ background: "#febc2e" }} />
          <span style={{ background: "#28c840" }} />
        </div>
        <div className="portal-url">portal.dysumcorp.pro/j/xk92m</div>
        <div className="portal-lock">🔒</div>
      </div>

      <div className="portal-body">
        <div className="portal-branding">
          <div className="brand-avatar">AS</div>
          <div>
            <p className="brand-name">Alex Sullivan, CPA</p>
            <p className="brand-sub">Secure Document Portal</p>
          </div>
        </div>

        <div className="drop-zone">
          <div className="drop-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
                stroke="#6c63ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="17 8 12 3 7 8"
                stroke="#6c63ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="12"
                y1="3"
                x2="12"
                y2="15"
                stroke="#6c63ff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="drop-text">
            Drop files here or <span>browse</span>
          </p>
          <p className="drop-sub">
            No account needed · Files go straight to Drive
          </p>
        </div>

        <div className="file-list">
          {files.map((f, i) => (
            <div
              key={i}
              className="file-item"
              style={{ animationDelay: `${800 + i * 150}ms` }}
            >
              <div className="file-icon-wrap" style={{ background: f.color }}>
                <span>{f.icon}</span>
              </div>
              <div className="file-info">
                <p className="file-name">{f.name}</p>
                <p className="file-size">{f.size}</p>
              </div>
              <div className="file-check">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#22c55e" />
                  <polyline
                    points="9 12 11 14 15 10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="storage-badge">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        <span>Saved to Google Drive</span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const niches = [
    "Accountants",
    "Lawyers",
    "Designers",
    "Consultants",
    "Therapists",
  ];
  const [nicheIdx, setNicheIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setNicheIdx((i) => (i + 1) % niches.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #f7f6f2;
          --surface: #ffffff;
          --ink: #0e0e0e;
          --ink-soft: #5a5a5a;
          --ink-muted: #999;
          --accent: #6c63ff;
          --accent-light: #ece9ff;
          --accent-dark: #4f46e5;
          --green: #22c55e;
          --border: #e5e3dd;
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05);
          --shadow-lg: 0 20px 60px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.06);
          --radius: 16px;
          --radius-sm: 10px;
          --font-display: 'Bricolage Grotesque', sans-serif;
          --font-body: 'DM Sans', sans-serif;
        }

        body {
          font-family: var(--font-body);
          background: var(--bg);
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
        }

        .announce-bar {
          background: var(--ink);
          color: #fff;
          text-align: center;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 450;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .announce-bar a {
          color: #a5b4fc;
          text-decoration: none;
          font-weight: 600;
        }

        .announce-bar a:hover { text-decoration: underline; }

        .hero {
          min-height: 100vh;
          padding-top: 64px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.5;
          pointer-events: none;
        }

        .hero::after {
          content: '';
          position: absolute;
          top: 10%;
          right: 5%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-inner {
          flex: 1;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 80px 40px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          color: var(--ink-soft);
          width: fit-content;
          box-shadow: var(--shadow-sm);
          animation: fadeSlideUp 0.6s ease both;
        }

        .badge-dot {
          width: 7px;
          height: 7px;
          background: var(--green);
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.1); }
        }

        .hero-headline {
          font-family: var(--font-display);
          font-size: clamp(48px, 5vw, 72px);
          font-weight: 750;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--ink);
          animation: fadeSlideUp 0.6s ease 0.1s both;
        }

        .hero-headline em {
          font-style: normal;
          color: var(--accent);
        }

        .niche-rotator {
          display: inline-block;
          position: relative;
          overflow: hidden;
          height: 1.1em;
          vertical-align: bottom;
        }

        .niche-word {
          display: block;
          animation: wordSlide 0.4s ease both;
          color: var(--accent);
        }

        @keyframes wordSlide {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .hero-desc {
          font-size: 20px;
          line-height: 1.65;
          color: var(--ink-soft);
          max-width: 500px;
          animation: fadeSlideUp 0.6s ease 0.2s both;
        }

        .hero-cta {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
          animation: fadeSlideUp 0.6s ease 0.3s both;
        }

        .btn-accent {
          background: var(--accent);
          color: #fff;
          padding: 16px 32px;
          font-size: 17px;
          border-radius: 12px;
          border: none;
          font-family: var(--font-body);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-accent:hover {
          background: var(--accent-dark);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(108, 99, 255, 0.35);
        }

        .btn-outline {
          background: transparent;
          color: var(--ink);
          border: 1.5px solid var(--border);
          padding: 16px 32px;
          font-size: 17px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-outline:hover {
          border-color: var(--ink);
          background: var(--surface);
        }

        .hero-trust {
          display: flex;
          align-items: center;
          gap: 14px;
          animation: fadeSlideUp 0.6s ease 0.4s both;
        }

        .trust-avatars {
          display: flex;
        }

        .trust-avatars span {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--bg);
          background: linear-gradient(135deg, #c7d2fe, #818cf8);
          display: grid;
          place-items: center;
          font-size: 11px;
          font-weight: 600;
          color: white;
          margin-left: -8px;
        }

        .trust-avatars span:first-child { margin-left: 0; background: linear-gradient(135deg, #fca5a5, #f87171); }
        .trust-avatars span:nth-child(2) { background: linear-gradient(135deg, #6ee7b7, #10b981); }
        .trust-avatars span:nth-child(3) { background: linear-gradient(135deg, #93c5fd, #3b82f6); }
        .trust-avatars span:nth-child(4) { background: linear-gradient(135deg, #fcd34d, #f59e0b); }

        .trust-text {
          font-size: 15px;
          color: var(--ink-soft);
          line-height: 1.4;
        }

        .trust-text strong {
          color: var(--ink);
          font-weight: 650;
        }

        .integrations {
          display: flex;
          align-items: center;
          gap: 6px;
          animation: fadeSlideUp 0.6s ease 0.5s both;
        }

        .integrations-label {
          font-size: 12px;
          color: var(--ink-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
          margin-right: 4px;
        }

        .integration-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 13px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 14px;
          font-weight: 550;
          color: var(--ink-soft);
          box-shadow: var(--shadow-sm);
          white-space: nowrap;
        }

        .hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeSlideUp 0.8s ease 0.2s both;
          min-height: 650px;
          width: 100%;
        }

        .size-16 {
          width: 5rem;
          height: 5rem;
        }

        .size-12 {
          width: 3rem;
          height: 3rem;
        }
          background: var(--surface);
          border-radius: 20px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-lg);
          width: 100%;
          max-width: 420px;
          overflow: hidden;
          position: relative;
        }

        .portal-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: #f9f9f7;
          border-bottom: 1px solid var(--border);
        }

        .portal-dots {
          display: flex;
          gap: 5px;
        }

        .portal-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .portal-url {
          flex: 1;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 11.5px;
          color: var(--ink-soft);
          text-align: center;
          font-family: 'SF Mono', monospace;
        }

        .portal-lock {
          font-size: 13px;
        }

        .portal-body {
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .portal-branding {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--ink);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          display: grid;
          place-items: center;
          font-family: var(--font-display);
          flex-shrink: 0;
        }

        .brand-name {
          font-size: 14px;
          font-weight: 650;
          color: var(--ink);
        }

        .brand-sub {
          font-size: 12px;
          color: var(--ink-muted);
        }

        .drop-zone {
          border: 1.5px dashed #d1cefc;
          border-radius: 12px;
          background: #f9f8ff;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
          transition: all 0.2s;
        }

        .drop-zone:hover {
          border-color: var(--accent);
          background: var(--accent-light);
        }

        .drop-icon {
          width: 44px;
          height: 44px;
          background: var(--accent-light);
          border-radius: 10px;
          display: grid;
          place-items: center;
          margin-bottom: 4px;
        }

        .drop-text {
          font-size: 13.5px;
          font-weight: 550;
          color: var(--ink);
        }

        .drop-text span {
          color: var(--accent);
          text-decoration: underline;
          cursor: pointer;
        }

        .drop-sub {
          font-size: 11.5px;
          color: var(--ink-muted);
        }

        .file-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .file-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          background: #fafafa;
          border: 1px solid var(--border);
          border-radius: 10px;
          animation: fadeSlideUp 0.4s ease both;
        }

        .file-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 7px;
          display: grid;
          place-items: center;
          font-size: 14px;
          flex-shrink: 0;
        }

        .file-info { flex: 1; min-width: 0; }

        .file-name {
          font-size: 12.5px;
          font-weight: 550;
          color: var(--ink);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .file-size {
          font-size: 11px;
          color: var(--ink-muted);
        }

        .file-check { flex-shrink: 0; }

        .storage-badge {
          position: absolute;
          bottom: -14px;
          right: 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 7px 14px;
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 600;
          color: var(--ink);
          box-shadow: var(--shadow-md);
          animation: floatBadge 3s ease-in-out infinite;
        }

        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .stat-card {
          position: absolute;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 14px 18px;
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          gap: 2px;
          animation: fadeSlideUp 0.6s ease both, floatCard 4s ease-in-out infinite 1s;
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-6px) rotate(var(--rot, 0deg)); }
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 750;
          color: var(--ink);
          letter-spacing: -0.03em;
        }

        .stat-label {
          font-size: 11.5px;
          color: var(--ink-muted);
          font-weight: 450;
        }

        .stat-card.top-left {
          top: -20px;
          left: -30px;
          --rot: -2deg;
          transform: rotate(-2deg);
        }

        .stat-card.bottom-right {
          bottom: 40px;
          right: -30px;
          --rot: 2deg;
          transform: rotate(2deg);
        }

        .logos-strip {
          max-width: 1200px;
          margin: 0 auto 20px;
          width: 100%;
          padding: 0 40px 40px;
          position: relative;
          z-index: 1;
        }

        .logos-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .logos-divider-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .logos-divider-text {
          font-size: 12px;
          color: var(--ink-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        .logos-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .logo-item {
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0.45;
          transition: opacity 0.2s;
          filter: grayscale(1);
        }

        .logo-item:hover {
          opacity: 0.8;
          filter: grayscale(0);
        }

        .logo-icon {
          width: 22px;
          height: 22px;
          border-radius: 5px;
          display: grid;
          place-items: center;
          font-size: 14px;
        }

        .logo-name {
          font-size: 14px;
          font-weight: 650;
          color: var(--ink);
          font-family: var(--font-display);
          letter-spacing: -0.02em;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 40px 20px 20px;
          }

          .hero-right {
            justify-content: center;
          }

          .stat-card.top-left { left: -10px; top: -10px; }
          .stat-card.bottom-right { right: -10px; }

          .logos-strip { padding: 0 20px 30px; }
          .logos-row { gap: 20px; }
        }
      `}</style>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="badge">
              <span className="badge-dot" />
              No client accounts needed · Ever
            </div>

            <h1 className="hero-headline">
              Collect files from clients.
              <br />
              Straight to your <em>cloud storage.</em>
            </h1>

            <p className="hero-desc">
              Create secure upload portals branded to your practice. Share a
              link — your clients upload files instantly, no login required.
              Everything lands directly in your Google Drive or Dropbox.
            </p>

            <div className="hero-cta">
              <button className="btn-accent">Create your portal free</button>
              <button className="btn-outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <polygon points="10,8 16,12 10,16" fill="currentColor" />
                </svg>
                Watch demo
              </button>
            </div>

            <div className="hero-trust">
              <div className="trust-avatars">
                <span>MK</span>
                <span>JS</span>
                <span>AL</span>
                <span>PR</span>
              </div>
              <p className="trust-text">
                <strong>4,200+ professionals</strong> — accountants,
                <br />
                lawyers, designers & more use dysumcorp
              </p>
            </div>

            <div className="integrations">
              <span className="integrations-label">Works with</span>
              <div className="integration-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google Drive
              </div>
              <div className="integration-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.5 15.5L2 10.5l4.5-5 4.5 5L6.5 15.5z"
                    fill="#0061FF"
                  />
                  <path
                    d="M17.5 15.5L13 10.5l4.5-5 4.5 5-4.5 5z"
                    fill="#0061FF"
                  />
                  <path
                    d="M6.5 16.5l5.5 3.5 5.5-3.5-5.5-3.5-5.5 3.5z"
                    fill="#0061FF"
                  />
                  <path
                    d="M2 10.5l5.5 3.5 5.5-3.5L7.5 7 2 10.5z"
                    fill="#007EE5"
                  />
                  <path
                    d="M13 10.5l5.5 3.5 5.5-3.5L18.5 7 13 10.5z"
                    fill="#007EE5"
                  />
                </svg>
                Dropbox
              </div>
              <div className="integration-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"
                    fill="#FF4B4B"
                  />
                  <path
                    d="M8 11h8M8 15h5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path d="M8 7h3a2 2 0 010 4H8V7z" fill="white" />
                </svg>
                OneDrive
              </div>
            </div>
          </div>

          <div className="hero-right">
            <AnimatedBeamMultipleOutputDemo />
          </div>
        </div>

        <div className="logos-strip">
          <div className="logos-divider">
            <div className="logos-divider-line" />
            <span className="logos-divider-text">
              Trusted by professionals in
            </span>
            <div className="logos-divider-line" />
          </div>
          <div className="logos-row">
            {[
              { icon: "⚖️", name: "Legal" },
              { icon: "📊", name: "Accounting" },
              { icon: "🏥", name: "Healthcare" },
              { icon: "🎨", name: "Creative" },
              { icon: "🏗️", name: "Architecture" },
              { icon: "🧠", name: "Consulting" },
              { icon: "💼", name: "Finance" },
            ].map((item) => (
              <div key={item.name} className="logo-item">
                <div className="logo-icon">{item.icon}</div>
                <span className="logo-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
