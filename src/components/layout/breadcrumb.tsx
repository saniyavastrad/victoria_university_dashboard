"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Breadcrumb: FC = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const items = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);

    return { href, label };
  });

  if (items.length === 0) return null;

  return (
    <nav className="flex items-center gap-1 text-xs text-muted-foreground" aria-label="Breadcrumb">
      <Link href="/dashboard" className={cn("hover:text-foreground")}>Dashboard</Link>
      {items.map((item) => (
        <span key={item.href} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3" />
          <Link
            href={item.href}
            className={cn("hover:text-foreground", item.href === pathname && "font-medium text-foreground")}
          >
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
};
