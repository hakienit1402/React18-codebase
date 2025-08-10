import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Button } from "@/components/Button";
import CheckFilledIcon from "@/components/Icons/CheckFilledIcon";
import ErrorFilledIcon from "@/components/Icons/ErrorFilledIcon";
import InfoFilledIcon from "@/components/Icons/InfoFilledIcon";
import WarningFilledIcon from "@/components/Icons/WarningFilledIcon";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "flex relative gap-2 py-4 w-full box-border items-center rounded-md border-t-0 border-r-0 border-b-0 border-l-4 bg-neutral-dark-200",
  {
    variants: {
      variant: {
        success: "border-semantics-green-500",
        info: "border-semantics-blue",
        warning: "border-semantics-yellow-500",
        error: "border-semantics-red-500",
        positive: "border-semantics-green-500",
        general: "border-semantics-blue",
        important: "border-semantics-yellow-500",
        crucial: "border-semantics-red-500",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);
interface AlertProps extends VariantProps<typeof alertVariants> {
  titleText?: string | React.ReactNode;
  hasTitle?: boolean;
  message?: React.ReactNode;
  actionLabel?: string;
  onClose?: () => void;
  onAction?: () => void;
  hasIcon?: boolean;
  isDefaultAlert?: boolean;
}

export type AlertVariantType =
  | "success"
  | "info"
  | "warning"
  | "error"
  | "positive"
  | "general"
  | "important"
  | "crucial";

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & AlertProps>(
  (
    { className, variant, hasIcon = true, hasTitle = false, isDefaultAlert = true, ...props },
    ref,
  ) => {
    const ICON: Record<AlertVariantType, React.ReactNode> = {
      success: <CheckFilledIcon />,
      info: <InfoFilledIcon />,
      warning: <WarningFilledIcon />,
      error: <ErrorFilledIcon />,
      positive: <CheckFilledIcon />,
      general: <InfoFilledIcon />,
      important: <WarningFilledIcon />,
      crucial: <ErrorFilledIcon />,
    };
    if (isDefaultAlert) {
      return (
        <div
          ref={ref}
          role="alert"
          className={cn(alertVariants({ variant }), "w-full items-center pl-3 pr-4", className)}
          {...props}
        >
          {ICON[variant as AlertVariantType]}
          <div className="max-w-[calc(100%-2.2rem)] whitespace-pre-line break-words text-sm font-normal leading-[17.5px] text-neutral-light-300">
            {props.message}
          </div>
        </div>
      );
    }
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          alertVariants({ variant }),
          {
            "pl-3": hasIcon,
            "flex-col gap-4": hasTitle,
          },
          className,
        )}
        {...props}
      >
        {hasIcon && !hasTitle ? ICON[variant as AlertVariantType] : null}
        {hasTitle ? (
          <div className="flex items-center justify-start gap-2">
            {ICON[variant as AlertVariantType]}
            <p className="text-base font-semibold leading-5 text-neutral-light-100">
              {props.titleText}
            </p>
          </div>
        ) : null}
        <div className="flex max-w-[calc(100%-2rem)] flex-col gap-4 break-words text-sm font-normal leading-[17.5px] text-neutral-light-300">
          {props.message && <p>{props.message}</p>}
          {props.actionLabel && (
            <Button className="w-fit" variant="secondary" size="sm">
              {props.actionLabel}
            </Button>
          )}
        </div>
      </div>
    );
  },
);
Alert.displayName = "Alert";

export { Alert };
