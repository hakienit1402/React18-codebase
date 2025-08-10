import React from "react";

import { cn } from "@/lib/utils";

const DataTableEmptyContainer = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center rounded-sm bg-common-highlight pt-11",
        className,
      )}
    >
      {children ? (
        children
      ) : (
        <span className="inline-block text-sm text-neutral-dark-500">No data found.</span>
      )}
    </div>
  );
};

export default DataTableEmptyContainer;
