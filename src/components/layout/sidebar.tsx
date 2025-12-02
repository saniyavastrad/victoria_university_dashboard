"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  GraduationCap,
  HandCoins,
  Handshake,
  LayoutDashboard,
  ShieldCheck,
  Users2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isMobile?: boolean;
}

const navGroups = [
  {
    label: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Quality Modules",
    items: [
      {
        name: "Teaching & Learning",
        href: "/dashboard/teaching-learning",
        icon: BookOpen,
      },
      {
        name: "Accreditation & Curriculum",
        href: "/dashboard/accreditation-curriculum",
        icon: CheckCircle2,
      },
      {
        name: "Student Welfare & Retention",
        href: "/dashboard/student-welfare-retention",
        icon: Users2,
      },
      {
        name: "Infrastructure & Resources",
        href: "/dashboard/infrastructure-resources",
        icon: Building2,
      },
      {
        name: "Exams & Grading",
        href: "/dashboard/exams-grading",
        icon: GraduationCap,
      },
      {
        name: "Faculty Development",
        href: "/dashboard/faculty-development",
        icon: BookOpen,
      },
    ],
  },
  {
    label: "Support Modules",
    items: [
      {
        name: "Financial Sustainability",
        href: "/dashboard/financial-sustainability",
        icon: HandCoins,
      },
      {
        name: "Community Engagement",
        href: "/dashboard/community-engagement",
        icon: Handshake,
      },
      {
        name: "Analytics & Reporting",
        href: "/dashboard/analytics-reporting",
        icon: BarChart3,
      },
      {
        name: "Alerts Center",
        href: "/dashboard/alerts-center",
        icon: AlertTriangle,
      },
    ],
  },
];

export const Sidebar: FC<SidebarProps> = ({ isMobile }) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "min-h-screen w-64 flex-col bg-red-800 text-white",
        isMobile ? "flex" : "hidden md:flex"
      )}
    >
      <div className="flex h-16 items-center px-4 text-lg font-semibold tracking-tight">
        Victoria University
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-4 p-3">
          {navGroups.map((group) => (
            <div key={group.label} className="flex flex-col gap-1">
              <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {group.label}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
};
