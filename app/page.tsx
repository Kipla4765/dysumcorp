"use client";

import { LandingNavbar } from "@/components/landing-navbar";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import FeaturesSection from "@/components/features-section";
import PricingSection from "@/components/pricing-section";
import SecuritySection from "@/components/security-section";
import IntegrationsSection from "@/components/integrations-section";
import TestimonialsSection from "@/components/testimonials-section";
import CTASection from "@/components/cta-section";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-stone-200 bg-[#fafaf9]">
      <LandingNavbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <PricingSection />
      <SecuritySection />
      <IntegrationsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
