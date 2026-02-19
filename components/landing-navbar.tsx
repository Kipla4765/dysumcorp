"use client";

import { ArrowRight, Menu, Box } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Use Cases", href: "#use-cases" },
  { title: "Features", href: "#features" },
  { title: "Pricing", href: "#pricing" },
  { title: "Security", href: "#security" },
  { title: "Integrations", href: "#integrations" },
];

export function LandingNavbar() {
  const { data: session } = useSession();

  const handleSignUp = () => {
    if (session?.user) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/auth";
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#fafaf9] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1c1917] flex items-center justify-center rounded-lg">
            <Box className="text-stone-50 text-xl" />
          </div>
          <span className="serif-font text-2xl font-bold tracking-tight text-[#1c1917]">
            dysumcorp
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navigationItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="text-[10px] font-bold uppercase tracking-widest text-stone-700 hover:text-[#1c1917] transition-colors"
            >
              {item.title}
            </a>
          ))}
          <Button
            onClick={handleSignUp}
            className="bg-[#1c1917] text-stone-50 px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all"
          >
            Sign up
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden" size="icon" variant="ghost">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[350px]">
            <nav className="flex flex-col gap-6 mt-8">
              {navigationItems.map((item) => (
                <a
                  key={item.title}
                  className="text-base font-medium text-stone-600 hover:text-stone-900"
                  href={item.href}
                >
                  {item.title}
                </a>
              ))}
              <Button
                onClick={handleSignUp}
                className="bg-[#1c1917] text-stone-50 mt-4"
              >
                Sign up
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
