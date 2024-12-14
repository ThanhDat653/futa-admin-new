/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
   Calendar,
   Map,
   ChartPie,
   UserPen,
   PanelLeftDashed, LayoutDashboard,
} from "lucide-react";

import {
   SidebarGroup,
   SidebarGroupContent,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Menu items.
const items = [
   {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
   },
   {
      title: "Schedule",
      url: "schedules",
      icon: Calendar,
   },
   {
      title: "Trip",
      url: "trips",
      icon: Map,
   },
   {
      title: "Statistic",
      url: "statistic",
      icon: ChartPie,
   },
   {
      title: "Account",
      url: "accounts",
      icon: UserPen,
   },
   {
      title: "Bill",
      url: "bills",
      icon: PanelLeftDashed,
   },
];

export function AppSidebar() {
   const pathname = usePathname();
   return (
      <SidebarGroup>
         <div className="w-full px-10">
            <img src="/logo_banner.svg" alt="" className="w-full" />
         </div>
         <SidebarGroupContent className="mt-10">
            <SidebarMenu>
               {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                     <SidebarMenuButton
                        asChild
                        className={cn(
                           pathname.endsWith(item.url)
                              ? "bg-white text-slate-900"
                              : "",
                        )}
                     >
                        <a href={item.url}>
                           <item.icon />
                           <span>{item.title}</span>
                        </a>
                     </SidebarMenuButton>
                  </SidebarMenuItem>
               ))}
            </SidebarMenu>
         </SidebarGroupContent>
      </SidebarGroup>
   );
}
