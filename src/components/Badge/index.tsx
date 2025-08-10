import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded border-transparent p-2 text-sm font-normal transition-colors focus:outline-none ",
  {
    variants: {
      variant: {
        default: "border-transparent bg-neutral-dark-300 text-neutral-light-400 shadow",
        warning: "font-semibold text-semantics-yellow-500 p-0",
        success: "font-semibold text-semantics-green-500 p-0",
        info: "font-semibold text-semantics-blue p-0",
        error: "font-semibold text-semantics-red-500 p-0",
      },
      size: {
        small: "text-xs",
        medium: "text-sm",
        large: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

enum BADGE_VARIANTS {
  DEFAULT = "default",
  WARNING = "warning",
  SUCCESS = "success",
  INFO = "info",
  ERROR = "error",
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants, BADGE_VARIANTS };
