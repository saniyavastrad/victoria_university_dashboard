"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(
  null
);

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-flex">{children}</div>
    </DropdownMenuContext.Provider>
  );
};

type DropdownMenuTriggerProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  };

export const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ className, asChild = false, ...props }, ref) => {
  const ctx = React.useContext(DropdownMenuContext);
  if (!ctx) throw new Error("DropdownMenuTrigger must be used within DropdownMenu");

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      className={cn(className)}
      onClick={(e) => {
        ctx.setOpen(!ctx.open);
        props.onClick?.(e);
      }}
      {...props}
    />
  );
});

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" }
> = ({ className, style, align = "start", ...props }) => {
  const ctx = React.useContext(DropdownMenuContext);
  if (!ctx || !ctx.open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 min-w-[10rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        align === "end" ? "right-0" : "left-0",
        className
      )}
      style={style}
      {...props}
    />
  );
};

export const DropdownMenuLabel: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)}
    {...props}
  />
);

export const DropdownMenuSeparator: React.FC = () => (
  <div className="-mx-1 my-1 h-px bg-border" />
);

export const DropdownMenuItem: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => (
  <button
    className={cn(
      "flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  />
);
