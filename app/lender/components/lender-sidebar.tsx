import {
  Calendar,
  LayoutDashboard,
  HandCoins,
  CircleDollarSign,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/lib/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "./dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Offer",
    url: "./offer",
    icon: HandCoins,
  },
  {
    title: "Appointment",
    url: "./appointment",
    icon: Calendar,
  },
  {
    title: "Pending Payment",
    url: "./pendingPayment",
    icon: CircleDollarSign,
  },
  {
    title: "Profile",
    url: "./profile",
    icon: User,
  },
];

export function LenderSidebar() {
  return (
    <Sidebar className="top-[var(--nav-height)] max-h-[calc(100vh-var(--nav-height))]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="py-6">
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                    {/* <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a> */}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
