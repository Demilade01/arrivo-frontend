import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          error
            ? "border-red-500 focus-visible:ring-red-500"
            : "border-neutral-700 hover:border-neutral-600",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
