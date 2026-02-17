"use client";

import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import HowItWorks from "@/components/how-it-works";
import TestimonialsSection from "@/components/testimonials-section";
import { LandingNavbar } from "@/components/landing-navbar";

export default function Home() {
  return (
    <main>
      <LandingNavbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <TestimonialsSection />
    </main>
  );
}
