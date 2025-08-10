import React from "react";
import { NumericFormat } from "react-number-format";

import { cn } from "@/lib/utils";

const NumberFormat = React.forwardRef<
  React.ElementRef<typeof NumericFormat>,
  React.ComponentProps<typeof NumericFormat> & {
    startAdornment?: React.ReactNode | string;
    endAdornment?: React.ReactNode | string;
    extendOnchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputClassName?: string;
    startAdornmentClassName?: string;
    endAdornmentClassName?: string;
  }
>(
  (
    {
      startAdornment = "",
      endAdornment = "",
      className,
      startAdornmentClassName,
      endAdornmentClassName,
      extendOnchange,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "flex w-full shrink-0 overflow-hidden rounded-lg border border-common-outline shadow-sm transition-colors [&:has(:disabled)]:cursor-not-allowed [&:has(:disabled)]:bg-neutral-dark-200 [&:has(:focus-visible)]:border-neutral-light-300 [&:has(:focus-visible)]:outline-none",
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
        <NumericFormat
          {...props}
          onChange={(e) => {
            extendOnchange?.(e);
            props.onChange?.(e);
          }}
          className={cn(
            "focus:shadow-input flex h-full w-full bg-transparent p-3 text-sm text-neutral-light-300 shadow-sm placeholder:text-neutral-light-800 focus-visible:outline-none disabled:cursor-not-allowed",
            { "pl-1": startAdornment, "pr-1": endAdornment },
            props.inputClassName,
          )}
          getInputRef={ref}
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

NumberFormat.displayName = "NumberFormat";

export default NumberFormat;
