import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:pointer-events-none disabled:opacity-50",
          {
            // Variants
            "bg-amber-500 text-neutral-950 hover:bg-amber-400":
              variant === "default",
            "bg-neutral-800 text-neutral-100 hover:bg-neutral-700":
              variant === "secondary",
            "border border-neutral-700 bg-transparent text-neutral-100 hover:bg-neutral-800 hover:border-neutral-600":
              variant === "outline",
            "text-neutral-100 hover:bg-neutral-800 hover:text-neutral-50":
              variant === "ghost",
            "text-amber-500 underline-offset-4 hover:underline":
              variant === "link",
            // Sizes
            "h-10 px-4 py-2 text-sm": size === "default",
            "h-9 px-3 text-xs": size === "sm",
            "h-12 px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
