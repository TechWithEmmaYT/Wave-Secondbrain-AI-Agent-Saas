import React from "react";
import { RemixiconComponentType } from "@remixicon/react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

type Props = {
  items: {
    title: string;
    url: string;
    icon: RemixiconComponentType;
  }[];
};

const NavMenu = ({ items }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <SidebarMenu>
        {items?.map((item) => {
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem
              key={item.title}
              className="relative flex flex-col items-stretch"
            >
              <SidebarMenuButton
                className="group/menu-button font-medium h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent
                hover:to-sidebar-accent/40 data-[active=true]:from-primary/20
                data-[active=true]:to-primary/5 [&>svg]:size-auto cursor-pointer "
                isActive={isActive}
                onClick={() => router.push(item.url)}
              >
                <item.icon
                  className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                  size={22}
                />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </>
  );
};

export default NavMenu;
