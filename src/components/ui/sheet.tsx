"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Sheet: React.FC<SheetProps> = ({
  open,
  onOpenChange,
  className,
  children,
  ...props
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div
        className="fixed inset-0 bg-black/40"
        onClick={() => onOpenChange?.(false)}
      />
      <div
        className={cn(
          "relative z-50 h-full w-72 max-w-full bg-background shadow-lg",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export interface SheetContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right";
}

export const SheetContent: React.FC<SheetContentProps> = ({
  side = "right",
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "h-full w-full",
        side === "left" ? "" : "ml-auto",
        className
      )}
      {...props}
    />
  );
};
