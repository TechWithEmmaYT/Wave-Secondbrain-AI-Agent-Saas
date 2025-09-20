"use client";

import React, { ReactNode } from "react";
import QueryProvider from "./query-provider";
import { Toaster } from "sonner";
import { ThemeProvider } from "./theme-provider";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-center" duration={3000} richColors />
      </ThemeProvider>
    </QueryProvider>
  );
};

export default Providers;
