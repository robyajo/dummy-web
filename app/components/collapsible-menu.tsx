"use client";

import * as React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/components/ui/sidebar";

interface CollapsibleMenuProps {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean | ((pathname: string) => boolean);
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}

export function CollapsibleMenu({ item }: { item: CollapsibleMenuProps }) {
  const location = useLocation();

  const isChildActive = item.items?.some(
    (subItem) =>
      subItem.url === location.pathname ||
      location.pathname.startsWith(`${subItem.url}/`)
  );

  const isPropActive =
    typeof item.isActive === "function"
      ? item.isActive(location.pathname)
      : item.isActive;

  const [isOpen, setIsOpen] = React.useState(isChildActive || !!isPropActive);

  React.useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive]);

  return (
    <Collapsible
      key={item.title}
      asChild
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title} isActive={isOpen}>
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => {
              const isSubActive =
                subItem.url === location.pathname ||
                location.pathname.startsWith(`${subItem.url}/`);
              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild isActive={isSubActive}>
                    <NavLink to={subItem.url} viewTransition>
                      <span>{subItem.title}</span>
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
