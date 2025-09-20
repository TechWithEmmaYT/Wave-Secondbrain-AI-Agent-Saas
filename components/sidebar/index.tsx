"use client";
import {
  RiScanLine,
  RiChatAiLine,
  RiBankCard2Line,
  RiSettings3Line,
} from "@remixicon/react";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "../ui/sidebar";
import { useRouter } from "next/navigation";
import { useAuthToken } from "@/hooks/use-auth-token";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Logo from "../logo";
import NavUser from "./nav-user";
import NavMenu from "./nav-menu";
import NavNotes from "./nav-notes";

const navMenu = [
  {
    title: "Home",
    url: "/home",
    icon: RiScanLine,
  },
  {
    title: "AI Chat",
    url: "/chat",
    icon: RiChatAiLine,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: RiBankCard2Line,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: RiSettings3Line,
  },
];

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const router = useRouter();
  const { clearBearerToken } = useAuthToken();
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  const { useSession, signOut } = authClient;
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const handleLogout = () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    signOut({
      fetchOptions: {
        onSuccess: () => {
          clearBearerToken();
          router.push("/auth/sign-in");
          setIsSigningOut(false);
        },
        onError: (ctx) => {
          setIsSigningOut(false);
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return (
    <Sidebar {...props} className="z-[99]">
      <SidebarHeader>
        <div className="w-full flex items-center justify-between">
          <Logo url="/home" />
          <SidebarTrigger className="-ms-4" />
        </div>
        <hr className="border-border mx-2 -mt-px" />
        {/* {Search Button} */}
      </SidebarHeader>
      <SidebarContent className="px-2 pt-2 overflow-x-hidden">
        <NavMenu items={navMenu} />
        <NavNotes />
      </SidebarContent>
      <SidebarFooter>
        <hr className="border-border mx-2 -mt-px" />
        <NavUser
          isLoading={isPending}
          user={{
            name: user?.name || "",
            email: user?.email || "",
          }}
          isSigningOut={isSigningOut}
          onSignOut={handleLogout}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
