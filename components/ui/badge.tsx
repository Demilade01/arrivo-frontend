import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-violet-500/10 text-violet-400 border border-violet-500/20":
            variant === "default",
          "bg-neutral-800 text-neutral-300 border border-neutral-700":
            variant === "secondary",
          "border border-neutral-600 text-neutral-300":
            variant === "outline",
          "bg-green-500/10 text-green-500 border border-green-500/20":
            variant === "success",
          "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20":
            variant === "warning",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
