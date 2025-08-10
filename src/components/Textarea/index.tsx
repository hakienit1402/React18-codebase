import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  extendOnchange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  inputClassName?: string;
  startAdornmentClassName?: string;
  endAdornmentClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      startAdornment,
      endAdornment,
      inputClassName,
      startAdornmentClassName,
      endAdornmentClassName,
      extendOnchange,
      ...props
    },
    ref,
  ) => {
    const countValue = props.value?.toString().length || 0;
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    React.useEffect(() => {
      if (textAreaRef?.current) {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 20}px`;
      }
    }, [textAreaRef, props.value]);
    return (
      <div
        className={cn(
          "relative flex w-full shrink-0 overflow-hidden rounded-lg border border-common-outline p-1 shadow-sm transition-colors [&:has(:disabled)]:cursor-not-allowed [&:has(:disabled)]:bg-neutral-dark-200 [&:has(:focus-visible)]:border-neutral-light-300 [&:has(:focus-visible)]:outline-none",
          className,
        )}
      >
        {startAdornment && (
          <span
            className={cn(
              "absolute left-0 top-1 z-[1] flex items-start py-2 pl-3 pr-1 text-current text-neutral-light-500",
              startAdornmentClassName,
            )}
          >
            {startAdornment}
          </span>
        )}
        <textarea
          className={cn(
            "focus:shadow-input flex min-h-40 w-full resize-none bg-transparent px-1.5 pb-4 text-sm text-neutral-light-300 shadow-sm placeholder:text-neutral-light-800 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-neutral-light-700",
            { "pl-10": startAdornment, "pr-10": endAdornment },
            inputClassName,
          )}
          ref={textAreaRef ? textAreaRef : ref}
          {...props}
          onChange={(e) => {
            props.onChange?.(e);
            extendOnchange?.(e);
          }}
          spellCheck={false}
        />
        {endAdornment && (
          <span
            className={cn(
              "absolute right-0 top-1 z-[1] flex items-start py-2 pl-1 pr-3 text-current text-neutral-light-500",
              endAdornmentClassName,
            )}
          >
            {endAdornment}
          </span>
        )}
        {props.maxLength && (
          <span className="pointer-events-none absolute bottom-1 right-2 z-[2] text-xs text-neutral-light-700">
            {countValue}
            {props.maxLength ? ` / ${props.maxLength}` : ""}
          </span>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
