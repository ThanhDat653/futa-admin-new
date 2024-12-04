import Header from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/side-bar";
import {
   Sidebar,
   SidebarContent,
   SidebarProvider,
} from "@/components/ui/sidebar";

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <SidebarProvider>
         <Sidebar>
            <SidebarContent className="bg-gradient-to-b from-sky-500 to-sky-600 text-white">
               <AppSidebar />
            </SidebarContent>
         </Sidebar>
         <main className="w-full min-h-screen h-full flex-col flex">
            <Header />
            <div className="w-full px-10 bg-slate-50 h-full mt-[60.8px]">
               {children}
            </div>
         </main>
      </SidebarProvider>
   );
}
