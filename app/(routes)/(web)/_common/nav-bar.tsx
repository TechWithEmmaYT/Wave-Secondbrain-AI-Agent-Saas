"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

function Navbar() {
  return (
    <header>
      <nav
        className={cn(
          "mx-auto mt-px flex items-center justify-between gap-3",
          "rounded-full border bg-white/70 px-4 py-2 shadow-sm backdrop-blur-md",
          "dark:bg-black/30"
        )}
        aria-label="Primary"
      >
        <Logo url="/" />
        <ul className="hidden items-center gap-6 text-sm xl:text-base font-normal md:flex">
          <li>
            <Link
              href="#pricing"
              className="transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="#features"
              className="transition-colors hover:text-foreground"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              Contact us
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/auth/sign-in"
            className="hidden text-sm transition-colors hover:text-foreground md:inline"
          >
            Sign In
          </Link>
          <Link href="/auth/sign-up" aria-label="Try WaveAI for free">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="flex items-center justify-center gap-2 px-4 py-2 cursor-pointer"
            >
              <span>Try WaveAI for Free</span>
              <ArrowRight className="h-4 w-4" />
            </HoverBorderGradient>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
