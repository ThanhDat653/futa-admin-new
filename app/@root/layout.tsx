import { AppSidebar } from "@/components/layout/side-bar";
import {
   Sidebar,
   SidebarContent,
   SidebarProvider,
   SidebarTrigger,
} from "@/components/ui/sidebar";

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <SidebarProvider>
         <Sidebar>
            <SidebarContent>
               <AppSidebar />
            </SidebarContent>
         </Sidebar>
         <main>
            <SidebarTrigger />
            {children}
         </main>
      </SidebarProvider>
   );
}
