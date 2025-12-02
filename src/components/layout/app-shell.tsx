"use client";

import { FC, ReactNode, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardHeader } from "./dashboard-header";
import { Sidebar } from "./sidebar";

interface AppShellProps {
  children: ReactNode;
}

export const AppShell: FC<AppShellProps> = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="p-0">
          <ScrollArea className="h-full">
            <Sidebar isMobile />
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col max-h-screen">
        <DashboardHeader onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-muted/30 px-4 py-4 md:px-6 md:py-6">
          {children}
        </main>
      </div>
    </div>
  );
};
