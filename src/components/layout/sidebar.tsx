"use client";

import { FC, useState } from "react";
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
  ChevronDown,
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
        name: "Teaching and Learning",
        icon: BookOpen,
        children: [
          {
            name: "Student Attendances",
            href: "/dashboard/teaching-learning",
            icon: Users2,
          },
          {
            name: "Lecturer Attendance",
            href: "/dashboard/teaching-learning/lecturer-attendance",
          },
        ],
      },
      {
        name: "Compliance",
        icon: CheckCircle2,
        children: [
          {
            name: "MOUs and Contracts",
            href: "/dashboard/accreditation/mous-contracts",
          },
          {
            name: "Part-Time Trackers",
            href: "/dashboard/accreditation/part-time-trackers",
          },
          {
            name: "Accreditation Tracking",
            href: "/dashboard/accreditation/accreditation-tracking",
          },
        ],
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
  const [teachingOpen, setTeachingOpen] = useState(false);
  const [accreditationOpen, setAccreditationOpen] = useState(false);

  return (
    <aside
      className={cn(
        "min-h-screen w-64 flex-col bg-white text-sky-900 border-r border-sky-200",
        isMobile ? "flex" : "hidden md:flex"
      )}
    >
      <div className="flex h-16 items-center px-4 text-lg font-semibold tracking-tight text-sky-900">
        Victoria University
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-4 p-3">
          {navGroups.map((group) => (
            <div key={group.label} className="flex flex-col gap-1">
              <p className="px-3 text-xs font-semibold uppercase tracking-wide text-sky-800/70">
                {group.label}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon;
                const hasChildren = Array.isArray((item as any).children) &&
                  (item as any).children.length > 0;

                if (hasChildren) {
                  const children = (item as any).children as {
                    name: string;
                    href: string;
                    icon?: any;
                  }[];
                  const isParentActive = children.some(
                    (child) => child.href === pathname
                  );

                  const isTeachingGroup = item.name === "Teaching and Learning";
                  const isAccreditationGroup = item.name === "Compliance";
                  const usesToggle = isTeachingGroup || isAccreditationGroup;
                  const isExpanded = usesToggle
                    ? isTeachingGroup
                      ? teachingOpen
                      : accreditationOpen
                    : true;

                  return (
                    <div key={item.name} className="flex flex-col gap-1">
                      <button
                        type="button"
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-sky-900 transition-colors hover:bg-sky-50",
                          isParentActive && "bg-sky-100 shadow-sm"
                        )}
                        onClick={
                          usesToggle
                            ? () =>
                                isTeachingGroup
                                  ? setTeachingOpen((prev) => !prev)
                                  : setAccreditationOpen((prev) => !prev)
                            : undefined
                        }
                      >
                        <span className="flex items-center gap-2">
                          {Icon && <Icon className="h-4 w-4" />}
                          <span>{item.name}</span>
                        </span>

                        {usesToggle && (
                          <ChevronDown
                            className={cn(
                              "h-3 w-3 text-sky-700 transition-transform",
                              isExpanded && "rotate-180"
                            )}
                          />
                        )}
                      </button>

                      {isExpanded && children.map((child) => {
                        const ChildIcon = child.icon ?? Icon;
                        const isActive = pathname === child.href;

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "ml-6 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sky-800",
                              isActive && "text-sky-900 font-medium"
                            )}
                          >
                            {ChildIcon && <ChildIcon className="h-4 w-4" />}
                            <span>{child.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  );
                }

                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href!}
                    href={item.href!}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors text-sky-900",
                      isActive
                        ? "bg-sky-100 text-sky-900 shadow-sm"
                        : "text-sky-800 hover:bg-sky-50 hover:text-sky-900"
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
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
