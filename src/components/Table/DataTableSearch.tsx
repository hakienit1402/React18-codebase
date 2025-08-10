import { SearchIcon } from "lucide-react";
import React from "react";

import { Input } from "@/components/Input";
import { cn } from "@/lib/utils";

interface DataTableSearchProps {
  searchQuery: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  classNameIconSearch?: string;
}

const DataTableSearch = ({
  searchQuery,
  placeholder,
  className,
  disabled,
  onSearch,
  classNameIconSearch,
}: DataTableSearchProps) => {
  return (
    <div className="relative flex w-full items-center">
      <SearchIcon
        className={cn(
          "absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-light-500",
          classNameIconSearch,
        )}
      />
      <Input
        placeholder={placeholder || "Search"}
        value={searchQuery}
        onChange={onSearch}
        disabled={disabled}
        className={cn("h-10 w-auto flex-1 py-1 pl-7 pr-1 text-sm", className)}
        inputClassName="!pr-0"
      />
    </div>
  );
};

export default DataTableSearch;
