import { Metadata } from "next";

import { TermsClient } from "./terms-client";

export const metadata: Metadata = {
  title: "Terms of Service | Dysumcorp",
  description:
    "Read Dysumcorp's terms of service. Our agreement with you about using our secure document collection platform.",
  alternates: {
    canonical: "https://dysumcorp.pro/terms",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
