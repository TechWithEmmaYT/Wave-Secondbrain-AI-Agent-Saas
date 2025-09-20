import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RiExternalLinkLine } from "@remixicon/react";

const Hero = () => {
  return (
    <section
      className={cn(
        "relative mt-6 overflow-hidden rounded-3xl border shadow-sm",
        "px-6 py-14 sm:py-16 md:py-18"
      )}
    >
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Badges */}
        <div className="mb-5 flex items-center justify-center gap-2">
          <span className="rounded-full border px-3 py-1 text-xs shadow-lg backdrop-blur-md font-medium bg-white dark:bg-black/40 border-white/20 dark:text-white">
            💫 New 🧠 AI-Powered Knowledge
          </span>
        </div>

        <h1
          className={cn(`relative text-balance font-extrabold tracking-tight leading-tight -ml-2
            text-4xl sm:text-5xl md:text-6xl text-shadow-xs dark:text-shadow-none
            bg-clip-text text-transparent bg-gradient-to-r from-black to-black dark:from-white dark:to-white
            transition-colors duration-500 opacity-0 fade-in-up [animation-delay:200ms]`)}
        >
          <span className="block ">The Secondbrain </span>
          <span className="block mt-2 fade-in-down">
            AI agent that works for you
          </span>
        </h1>

        <p
          className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg
        opacity-0 fade-in-up [animation-delay:200ms]
        "
        >
          Capture, organize, and connect your thoughts with intelligent AI
          assistance. Transform scattered ideas into actionable.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            asChild
            className={cn(
              "rounded-full px-6 py-5 sm:py-6 text-sm sm:!text-base shadow-lg !pl-8",
              "bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90"
            )}
          >
            <Link href="/auth/sign-in" className="">
              Get Started For Free
              <RiExternalLinkLine className="ml-1 h-4 w-4" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="rounded-full px-6 py-5 sm:py-6 text-sm sm:text-base hover:bg-muted/20"
            asChild
          >
            <Link href="/learn-more">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
