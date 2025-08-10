import { Table } from "@tanstack/react-table";

import { Button } from "@/components/Button";
import TablePaginationSkeleton from "@/components/Skeleton/TablePaginationSkeleton";
import { cn } from "@/lib/utils";
import { QueriesFilterProps } from "@/types/global.type";

interface DataDataTablePaginationProps<TData> {
  table: Table<TData>;
  queryParams: QueriesFilterProps;
  onChangePageIndex: (
    value: number,
    startOffset?: string,
    endOffset?: string,
  ) => void;
  totalRecord: number;
  isLoading?: boolean;
}

function DataTablePagination<TData>({
  queryParams: { pageIndex: index, pageSize: size },
  onChangePageIndex,
  totalRecord,
  isLoading,
}: DataDataTablePaginationProps<TData>) {
  const pageIndex = Number(index);
  const pageSize = Number(size);

  const totalPages = Math.ceil(totalRecord / pageSize);

  const getPages = () => {
    const pages: number[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (pageIndex <= 3) {
        pages.push(1, 2, 3, 4, -1, totalPages);
      } else if (pageIndex > totalPages - 3) {
        pages.push(
          1,
          -1,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          -1,
          pageIndex - 1,
          pageIndex,
          pageIndex + 1,
          -1,
          totalPages,
        );
      }
    }

    return pages;
  };

  const handleChangePageIndex = (value: number) => {
    if (value === pageIndex) return;
    onChangePageIndex(value);
  };

  if (isLoading) return <TablePaginationSkeleton />;

  return (
    <div
      data-testid="data-table-pagination"
      className="h-pagination flex items-center justify-between px-4 py-3"
    >
      <div className="text-muted-foreground flex flex-1 items-center text-sm">
        <p className="text-sm text-neutral-dark-500">{`Showing ${(pageIndex - 1) * pageSize + 1}-${
          pageIndex * pageSize <= totalRecord
            ? pageIndex * pageSize
            : totalRecord
        } of ${totalRecord} entries`}</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            {/* Previous Button */}
            <Button
              onClick={() => handleChangePageIndex(pageIndex - 1)}
              disabled={pageIndex === 1}
              className="w-[52px] rounded-r-none"
              variant={"outline"}
              size={"icon"}
            >
              Prev.
            </Button>

            {/* Page Buttons */}
            {getPages().map((page, index) =>
              page === -1 ? (
                <span
                  key={index}
                  className="h-9 w-fit min-w-8 border border-l-0 border-neutral-dark-400 p-2 text-center text-neutral-dark-700"
                >
                  ...
                </span>
              ) : (
                <Button
                  key={index}
                  size={"icon"}
                  onClick={() => handleChangePageIndex(page)}
                  className={cn(`w-fit min-w-8 rounded-none border-l-0`, {
                    "border border-l-0 border-neutral-dark-400 focus:bg-primary-300":
                      page === pageIndex,
                    "focus:bg-neutral-dark-600": page !== pageIndex,
                  })}
                  variant={page === pageIndex ? "primary" : "outline"}
                >
                  {page}
                </Button>
              ),
            )}

            {/* Next Button */}
            <Button
              variant={"outline"}
              onClick={() => onChangePageIndex(pageIndex + 1)}
              disabled={pageIndex === totalPages}
              className="w-[52px] rounded-l-none"
              size={"icon"}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTablePagination;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  pageIndex?: number;
  onChangeValue?: (value: number) => void;
}
