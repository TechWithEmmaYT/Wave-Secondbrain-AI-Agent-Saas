"use client";
import { useTheme } from "next-themes";
import React from "react";
import Image from "next/image";

const AppPreview = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark" ? true : false;
  return (
    <section className="-mt-10">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-white dark:bg-background shadow-md">
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="w-full">
            <div className="bg-background rounded-(--radius) relative mx-auto overflow-hidden border border-transparent shadow-xl shadow-black/10 ring-1 ring-black/10">
              <Image
                src={
                  isDark
                    ? "/images/wave_app-dark.png"
                    : "/images/wave_app-light.png"
                }
                alt="app screen"
                width="2880"
                height="1842"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
