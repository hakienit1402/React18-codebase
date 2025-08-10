import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  extendOnchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  inputClassName?: string;
  startAdornmentClassName?: string;
  endAdornmentClassName?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      startAdornment,
      endAdornment,
      inputClassName,
      startAdornmentClassName,
      endAdornmentClassName,
      className,
      type,
      extendOnchange,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "flex h-11 w-full shrink-0 overflow-hidden rounded-lg border border-common-outline shadow-sm transition-colors [&:has(:disabled)]:cursor-not-allowed [&:has(:disabled)]:bg-neutral-dark-200 [&:has(:focus-visible)]:border-neutral-light-300 [&:has(:focus-visible)]:outline-none",
          { "hover:border-neutral-light-300": !props.disabled },
          className,
        )}
      >
        {startAdornment && (
          <span
            className={cn(
              "flex items-center py-2 pl-3 pr-1 text-current text-neutral-light-500",
              startAdornmentClassName,
            )}
          >
            {startAdornment}
          </span>
        )}
        <input
          type={type}
          className={cn(
            "file:text-foreground focus:shadow-input flex h-full w-full bg-transparent p-3 text-sm text-neutral-light-300 shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-light-800 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-neutral-light-700",
            { "pl-1": startAdornment, "pr-1": endAdornment },
            inputClassName,
          )}
          ref={ref}
          {...props}
          onChange={(e) => {
            extendOnchange?.(e);
            props.onChange?.(e);
          }}
          spellCheck={false}
        />

        {endAdornment && (
          <span
            className={cn(
              "flex items-center py-2 pl-1 pr-3 text-current text-neutral-light-500",
              endAdornmentClassName,
            )}
          >
            {endAdornment}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
