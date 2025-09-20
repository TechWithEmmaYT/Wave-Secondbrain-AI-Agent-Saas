import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { RiLoader5Fill } from "@remixicon/react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar";
import { auth } from "@/lib/auth";
import MainContent from "./_common/main-content";
import NoteDialog from "@/components/note-dialog/note-dialog";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <RiLoader5Fill className="w-16 h-16 animate-spin text-primary" />
        </div>
      }
    >
      <NuqsAdapter>
        <SidebarProvider>
          {/* {App Sidebar} */}
          <AppSidebar />
          <SidebarInset className="relative overflow-x-hidden pt-0">
            <MainContent>{children}</MainContent>
            <NoteDialog />
          </SidebarInset>
        </SidebarProvider>
      </NuqsAdapter>
    </Suspense>
  );
}
