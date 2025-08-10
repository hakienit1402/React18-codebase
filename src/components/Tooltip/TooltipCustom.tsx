import React from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/Tooltip";

interface TooltipCustomProps {
  trigger: React.ReactNode;
  asChild?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  children?: React.ReactNode;
}
const TooltipCustom = ({
  trigger,
  children,
  asChild,
  triggerClassName,
  contentClassName,
  tooltipPosition,
}: TooltipCustomProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild} className={triggerClassName}>
          {trigger}
        </TooltipTrigger>
        <TooltipContent side={tooltipPosition} className={contentClassName}>
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipCustom;
