import {
  ColumnDef,
  flexRender,
  Row,
  Table as TableType,
} from "@tanstack/react-table";
import { Fragment } from "react/jsx-runtime";

import { ScrollArea } from "@/components/ScrollArea";
import TableBodySkeleton from "@/components/Skeleton/TableBodySkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import DataTableEmptyContainer from "@/components/Table/DataTableEmptyContainer";
import { TABLE_ACTIONS } from "@/constants/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
  hasStickyView?: boolean;
  tableToolbar?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  isLoading?: boolean;
  tableClassName?: string;
  theadClassName?: string;
  tableHeadClassName?: string;
  tableCellClassName?: string;
  tableBodyClassName?: string;
  emptyContainerClassName?: string;
  childContent?: React.ReactNode;
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactNode;
  enableSingleRowSelect?: boolean;
  hideLastRowBorderBottom?: boolean;
  footer?: React.ReactNode;
  highlightParent?: boolean;
  highlightCells?: number[];
}

const DataTableList = <TData, TValue>({
  table,
  columns,
  tableToolbar,
  hasStickyView,
  emptyComponent,
  isLoading,
  tableClassName,
  theadClassName,
  tableHeadClassName,
  tableCellClassName,
  tableBodyClassName,
  emptyContainerClassName,
  childContent,
  renderSubComponent,
  enableSingleRowSelect,
  hideLastRowBorderBottom,
  footer,
  highlightParent,
  highlightCells,
}: DataTableProps<TData, TValue>) => {
  const handleSingleRowSelect = (row: Row<TData>) => {
    if (enableSingleRowSelect) {
      table.setRowSelection({ [row.id]: true });
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col overflow-auto rounded-sm">
      {tableToolbar}
      <ScrollArea className="w-full">
        <Table
          className={cn("border-separate border-spacing-0", tableClassName)}
        >
          <TableHeader
            className={cn(
              "sticky top-0 z-10 border-b bg-common-background",
              theadClassName,
            )}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isActionColumn =
                    header.id === TABLE_ACTIONS && hasStickyView;
                  const isHighlightColumn = highlightCells?.includes(
                    header.column.getIndex() ?? 0,
                  );
                  return (
                    <TableHead
                      key={header.id}
                      style={
                        header.getSize()
                          ? {
                              width: header.getSize(),
                              minWidth: header.getSize(),
                            }
                          : {}
                      }
                      className={cn(
                        "border-b",
                        {
                          "sticky right-0 top-0 z-10 bg-common-background":
                            isActionColumn,
                          static: !hasStickyView,
                        },
                        {
                          "bg-common-surfaceOverlay": isHighlightColumn,
                        },
                        tableHeadClassName,
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {childContent ? <TableRow>{childContent}</TableRow> : null}
          {isLoading ? (
            <TableBodySkeleton columnSize={columns.length} />
          ) : (
            <TableBody className={tableBodyClassName}>
              {table.getRowModel().rows?.length > 0 ? (
                table.getRowModel().rows.map((row, rowIndex) => {
                  const subComp = renderSubComponent?.({ row });
                  const makeMainCellTransparent =
                    hideLastRowBorderBottom &&
                    rowIndex === table.getRowModel().rows.length - 1;
                  return (
                    <Fragment key={row.id}>
                      <TableRow
                        key={`tr-${row.id}`}
                        data-state={row.getIsSelected() && "selected"}
                        className={cn("row group", {
                          "peer shadow-none": subComp,
                          "cursor-pointer": enableSingleRowSelect,
                          "bg-common-highlight":
                            row.getIsSelected() && enableSingleRowSelect,
                        })}
                        onClick={() => handleSingleRowSelect(row)}
                      >
                        {row.getVisibleCells().map((cell) => {
                          const isActionColumn =
                            cell.column.id === TABLE_ACTIONS && hasStickyView;
                          const isHighlightColumn = highlightCells?.includes(
                            cell.column.getIndex() ?? 0,
                          );
                          return (
                            <TableCell
                              key={cell.id}
                              className={cn(
                                "bg-common-background",
                                "group-hover:bg-common-highlight",
                                {
                                  "border-b-0": subComp,
                                  "border-b-transparent":
                                    makeMainCellTransparent,
                                },
                                {
                                  "sticky right-0 z-[1] text-right":
                                    isActionColumn,
                                },
                                {
                                  "bg-common-surfaceOverlay group-hover:bg-common-surfaceOverlay":
                                    highlightParent && row.depth === 0,
                                },
                                {
                                  "bg-common-surfaceOverlay group-hover:bg-common-surfaceOverlay":
                                    isHighlightColumn,
                                },
                                tableCellClassName,
                              )}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                      {Boolean(renderSubComponent) && subComp && (
                        <TableRow key={`sub-${row.id}`}>
                          <TableCell
                            colSpan={row.getVisibleCells().length}
                            className={cn("bg-common-background")}
                          >
                            {renderSubComponent?.({ row })}
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-36 rounded-md p-0 text-center"
                  >
                    <DataTableEmptyContainer
                      className={emptyContainerClassName}
                    >
                      {emptyComponent ? (
                        emptyComponent
                      ) : (
                        <span className="mb-[10px] inline-block text-sm text-neutral-dark-500">
                          No items to display.
                        </span>
                      )}
                    </DataTableEmptyContainer>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </ScrollArea>
      {footer && (
        <div className="mt-3 flex w-full items-center justify-end gap-2">
          {footer}
        </div>
      )}
    </div>
  );
};

export default DataTableList;
