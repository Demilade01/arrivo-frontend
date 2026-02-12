"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, error, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "flex h-10 w-full appearance-none rounded-lg border bg-neutral-900 px-3 py-2 pr-10 text-sm text-neutral-100 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 focus-visible:ring-red-500"
              : "border-neutral-700 hover:border-neutral-600",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
          aria-hidden="true"
        />
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
