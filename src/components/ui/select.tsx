"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BasicSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select: React.FC<BasicSelectProps> = ({
  label,
  className,
  children,
  ...props
}) => {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
      {label && <span>{label}</span>}
      <select
        className={cn(
          "h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  );
};
