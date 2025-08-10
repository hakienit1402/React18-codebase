import { Skeleton } from "@/components/Skeleton";
import { TableBody, TableCell, TableRow } from "@/components/Table";

const TableBodySkeleton = ({
  columnSize = 10,
  pageSize = 10,
  isSimple = false,
}: {
  columnSize?: number;
  pageSize?: number;
  isSimple?: boolean;
}) => {
  if (isSimple) {
    return (
      <TableBody className="animate-pulse">
        {Array.from({ length: 2 }, (_, index) => (
          <TableRow key={index}>
            {Array.from({ length: columnSize }, (_, index) => (
              <TableCell key={index}>
                <Skeleton className="h-6 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <TableBody className="animate-pulse">
      {Array.from({ length: pageSize }, (_, index) => (
        <TableRow key={index}>
          {Array.from({ length: columnSize }, (_, index) => (
            <TableCell key={index}>
              <Skeleton className="h-6 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodySkeleton;
