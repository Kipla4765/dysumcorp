import { Building2 } from "lucide-react";

interface PortalHeaderProps {
  name: string;
  logoUrl?: string | null;
  welcomeMessage?: string | null;
  primaryColor: string;
  secondaryColor?: string;
  textColor: string;
  gradientEnabled?: boolean;
  contactInfo?: {
    domain?: string;
    email?: string;
  };
}

export function PortalHeader({
  name,
  logoUrl,
  welcomeMessage,
  primaryColor,
  secondaryColor,
  textColor,
  gradientEnabled = true,
  contactInfo,
}: PortalHeaderProps) {
  const gradientStyle = gradientEnabled && secondaryColor
    ? { background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }
    : { backgroundColor: primaryColor };

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="px-6 pt-5 pb-4 flex items-center gap-4">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0"
          style={gradientStyle}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={name}
              className="w-8 h-8 object-contain"
            />
          ) : (
            <Building2 className="w-6 h-6 text-white" />
          )}
        </div>
        <div>
          <h2
            className="font-bold text-xl tracking-tight"
            style={{ color: textColor }}
          >
            {name}
          </h2>
          {contactInfo && (contactInfo.domain || contactInfo.email) && (
            <p className="text-sm font-medium mt-0.5" style={{ color: primaryColor }}>
              {contactInfo.domain && contactInfo.domain}
              {contactInfo.domain && contactInfo.email && " · "}
              {contactInfo.email && contactInfo.email}
            </p>
          )}
        </div>
      </div>
      {welcomeMessage && (
        <div className="px-6 pb-5 border-t border-slate-100 bg-slate-50">
          <p className="text-base font-medium pt-4" style={{ color: textColor }}>
            {welcomeMessage}
          </p>
        </div>
      )}
    </header>
  );
}
