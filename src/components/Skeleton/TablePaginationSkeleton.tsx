import { Skeleton } from "@/components/Skeleton";

const TablePaginationSkeleton = () => {
  return (
    <div className="h-pagination flex items-center justify-between px-4 py-3">
      <div className="text-muted-foreground flex flex-1 items-center text-sm">
        <Skeleton className="h-5 w-[200px]" />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Skeleton className="h-9 w-[200px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePaginationSkeleton;
