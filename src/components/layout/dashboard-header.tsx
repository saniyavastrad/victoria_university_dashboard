"use client";

import { FC } from "react";
import { Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Breadcrumb } from "./breadcrumb";

interface DashboardHeaderProps {
  onOpenMobileSidebar?: () => void;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({
  onOpenMobileSidebar,
}) => {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 bg-red-700 px-4 md:px-6 text-white">
      <div className="flex flex-1 items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onOpenMobileSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight md:text-base">
            VU Quality Assurance Dashboard
          </span>
          <span className="hidden md:inline-flex text-xs text-muted-foreground">
            <Breadcrumb />
          </span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2"
              aria-label="User menu"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback>VU</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-flex">
                Alex Johnson
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
