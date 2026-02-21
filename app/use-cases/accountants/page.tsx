import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AccountantsClient } from "@/app/use-cases/accountants/accountants-client";

export const metadata: Metadata = {
  title: "Collect Tax Documents Securely from Clients | For Accountants & CPAs",
  description:
    "CPAs and accountants use Dysumcorp to collect financial documents, tax returns, and records securely. No client accounts needed. Bank-level encryption.",
  alternates: {
    canonical: "https://dysumcorp.pro/use-cases/accountants",
  },
};

export default function AccountantsPage() {
  return <AccountantsClient />;
}
