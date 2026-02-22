import { Metadata } from "next";

import { PrivacyClient } from "./privacy-client";

export const metadata: Metadata = {
  title: "Privacy Policy | Dysumcorp",
  description:
    "Learn how Dysumcorp protects your data and privacy. Our commitment to security, transparency, and your control over personal information.",
  alternates: {
    canonical: "https://dysumcorp.pro/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
