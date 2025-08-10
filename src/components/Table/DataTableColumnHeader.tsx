import { Column } from "@tanstack/react-table";
import queryString from "query-string";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";
import SortActiveIcon from "@/components/Icons/SortActiveIcon";
import SortAscIcon from "@/components/Icons/SortAscIcon";
import SortDescIcon from "@/components/Icons/SortDescIcon";
import { QUERY_DEFAULT } from "@/constants/table";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  headerTitleCustom?: React.ReactNode;
  width?: number | string;
  childAction?: React.ReactNode;
  sortInternalComponent?: React.ReactNode;
  customContainerClassName?: string;
  textClassName?: string;
  disabled?: boolean;
  sortInternal?: {
    sortable: boolean;
    sortFn: (value: string | null) => void;
  };
  notResetPageIndex?: boolean;
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  width,
  disabled,
  childAction = null,
  customContainerClassName,
  textClassName,
  sortInternal,
  sortInternalComponent,
  notResetPageIndex,
  headerTitleCustom,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = queryString.parse(location.search);
    if ("sortBy" in params === false) {
      column.clearSorting();
    }
    if (params["sortBy"] === column.id && params["order"] === "asc") {
      column.toggleSorting(false);
    } else if (
      params["sortBy"] === `${column.id}` &&
      params["order"] === "desc"
    ) {
      column.toggleSorting(true);
    }
  }, [column, location.search]);

  if (!column.getCanSort()) {
    return (
      <div className={customContainerClassName}>
        <span
          className={cn("inline-block text-neutral-dark-600", className)}
          style={{ width }}
        >
          {headerTitleCustom || title}
        </span>
        {childAction}
      </div>
    );
  }

  const handleSort = () => {
    const params = queryString.parse(location.search);
    // reset page index to 1 when sorting
    if (!notResetPageIndex) params["pageIndex"] = QUERY_DEFAULT.pageIndex;
    switch (column.getIsSorted()) {
      case "asc":
        params["sortBy"] = `${column.id}`;
        params["order"] = `desc`;
        column.toggleSorting(true);
        break;
      case "desc":
        delete params["sortBy"];
        delete params["order"];
        column.clearSorting();
        break;
      default:
        params["sortBy"] = column.id;
        params["order"] = `asc`;
        column.toggleSorting(false);
        break;
    }

    navigate(
      { search: queryString.stringify(params) },
      { state: location.state },
    );
  };

  const handleSortInternal = () => {
    switch (column.getIsSorted()) {
      case "asc":
        sortInternal?.sortFn(`-${column.id}`);
        column.toggleSorting(true);
        break;
      case "desc":
        sortInternal?.sortFn(null);
        column.clearSorting();
        break;
      default:
        sortInternal?.sortFn(column.id);
        column.toggleSorting(false);
        break;
    }
  };

  return (
    <div
      key={column.id}
      className={cn("flex flex-col gap-2 py-2", customContainerClassName)}
    >
      <div
        className={cn("flex items-center gap-x-1", textClassName)}
        style={{ width }}
      >
        <span className="inline-block whitespace-nowrap text-neutral-dark-600">
          {title}
        </span>
        {sortInternalComponent ? (
          sortInternalComponent
        ) : (
          <Button
            disabled={disabled}
            variant="tertiary"
            key={location.search}
            className="h-7 w-7 rounded-full p-1"
            onClick={sortInternal?.sortable ? handleSortInternal : handleSort}
          >
            {{
              asc: <SortAscIcon className="h-5 w-5" color="#2F2C3A" />,
              desc: <SortDescIcon className="h-5 w-5" color="#2F2C3A" />,
            }[column.getIsSorted() as string] ?? <SortActiveIcon />}
          </Button>
        )}
      </div>
      {childAction}
    </div>
  );
}

export default DataTableColumnHeader;
