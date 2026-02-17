"use client";

import { ArrowRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSession } from "@/lib/auth-client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Features", href: "#features" },
  { title: "Pricing", href: "#pricing" },
  { title: "Security", href: "#security" },
  { title: "Demo", href: "#demo" },
  { title: "About", href: "#about" },
];

export function LandingNavbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleGetStarted = () => {
    if (session?.user) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  };

  return (
    <header
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[80%] max-w-4xl rounded-full bg-white/90 backdrop-blur-md shadow-xl shadow-slate-900/10 border border-slate-200/50"
      style={{ padding: "0 24px" }}
    >
      <div className="flex h-16 items-center justify-between gap-6">
        <Link className="flex items-center gap-2 shrink-0" href="/">
          <Image alt="Dysumcorp" height={24} src="/logo.svg" width={48} />
          <span className="text-xl font-semibold text-slate-900">
            Dysumcorp
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.map((item) => (
            <a
              key={item.title}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              href={item.href}
            >
              {item.title}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            className="hidden md:inline-flex bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all"
            style={{ padding: "10px 24px" }}
            onClick={handleGetStarted}
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden" size="icon" variant="ghost">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[350px]">
              <nav className="flex flex-col gap-6 mt-8">
                {navigationItems.map((item) => (
                  <a
                    key={item.title}
                    className="text-base font-medium text-slate-600 hover:text-slate-900"
                    href={item.href}
                  >
                    {item.title}
                  </a>
                ))}
                <Button
                  className="bg-slate-900 hover:bg-slate-800 text-white mt-4"
                  style={{ padding: "12px 32px" }}
                  onClick={handleGetStarted}
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
