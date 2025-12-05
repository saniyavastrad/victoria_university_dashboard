"use client";

import { FC, ReactNode, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Bell, Menu, Sun } from "lucide-react";
import { Sidebar } from "./sidebar";
import { ChatWidget } from "./chat-widget";

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

      <div className="relative flex flex-1 flex-col max-h-screen bg-slate-50">
        <div className="flex h-14 items-center justify-between gap-3 px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open sidebar navigation"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 items-center justify-end gap-3">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle color mode"
            >
              <Sun className="h-6 w-6 text-sky-700" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6 text-sky-700" />
            </Button>

            <button
              type="button"
              className="flex items-center rounded-full p-1 transition-colors hover:bg-sky-50"
              aria-label="User menu"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white">
                S
              </div>
            </button>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
          {children}
        </main>

        <ChatWidget />
      </div>
    </div>
  );
};
