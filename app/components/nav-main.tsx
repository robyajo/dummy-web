import {
  CalendarSync,
  ChevronRight,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "~/components/ui/sidebar";
import { CollapsibleMenu } from "./collapsible-menu";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <CollapsibleMenu
          item={{
            title: "Books",
            url: "/books",
            icon: CalendarSync,
            isActive: (pathname) => pathname.startsWith("/books"),
            items: [
              {
                title: "Book EN",
                url: "/books/en",
              },
              {
                title: "Book ID",
                url: "/books/id",
              },
            ],
          }}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
}
