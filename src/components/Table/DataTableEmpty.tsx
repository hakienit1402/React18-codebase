import { Plus, Search } from "lucide-react";
import React from "react";

import { Button } from "@/components/Button";

interface DataTableEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  actionText?: React.ReactNode;
  handleAction?: () => void;
}

const DataTableEmpty = ({ description, title, actionText, handleAction }: DataTableEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Search className="h-6 w-6 text-neutral-dark-400" />
      {title && <p className="font-semibold text-neutral-dark-500">{title}</p>}
      {description && <p className="text-xs font-semibold text-neutral-dark-500">{description}</p>}
      {actionText && (
        <Button onClick={handleAction} variant="secondary" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          <span>{actionText}</span>
        </Button>
      )}
    </div>
  );
};

export default DataTableEmpty;
