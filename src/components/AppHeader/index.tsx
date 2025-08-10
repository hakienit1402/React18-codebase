import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AppHeaderProps {
  title: string | ReactNode;
  moduleName?: string | ReactNode;
  className?: string;
}
export const AppHeader = ({ title, moduleName, className }: AppHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {title && title}
      {moduleName && (
        <div className="text-2xl font-semibold text-neutral-light-100">
          {moduleName}
        </div>
      )}
    </div>
  );
};
