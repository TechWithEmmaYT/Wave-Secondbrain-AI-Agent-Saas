import React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RiLoader5Fill, RiLogoutBoxLine } from "@remixicon/react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ChevronsUpDownIcon } from "lucide-react";

type Props = {
  isLoading: boolean;
  isSigningOut: boolean;
  user: {
    name: string;
    email: string;
  };
  onSignOut: () => void;
};

const NavUser = ({ user, isLoading, isSigningOut, onSignOut }: Props) => {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {isLoading ? (
            <RiLoader5Fill className="w-5 h-5 animate-spin" />
          ) : (
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent  data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg border border-primary">
                  <AvatarFallback className="rounded-lg">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate font-medium">{user?.email}</span>
                </div>
                <ChevronsUpDownIcon className="size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          )}
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
            onCloseAutoFocus={(e) => {
              if (isSigningOut) {
                e.preventDefault();
              }
            }}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg border border-primary">
                  <AvatarFallback className="rounded-lg">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate font-medium">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="relative"
              disabled={isSigningOut}
              onClick={onSignOut}
            >
              <RiLogoutBoxLine className="text-muted-foreground/60" />
              Log Out
              {isSigningOut && (
                <RiLoader5Fill className="w-4 h-4 absolute right-2 animate-spin" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
