import { Metadata } from "next";

import { UseCasesClient } from "./use-cases-client";

export const metadata: Metadata = {
  title: "Use Cases | Dysumcorp — Secure Document Collection for Professionals",
  description:
    "Discover how law firms, accountants, wealth advisors, and real estate professionals use Dysumcorp to securely collect client documents. No email attachments. No friction.",
  alternates: {
    canonical: "https://dysumcorp.pro/use-cases",
  },
};

export default function UseCasesPage() {
  return <UseCasesClient />;
}
