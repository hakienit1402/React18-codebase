import { flexRender, Row, Table } from "@tanstack/react-table";
import { useVirtualizer, VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import React, { useImperativeHandle } from "react";

import { cn } from "@/lib/utils";

interface DataTableProps<TData> {
  table: Table<TData>;
  tableToolbar?: React.ReactNode;
  tableFooter?: React.ReactNode;
  tableHeadClassName?: string;
  tableCellClassName?: string;
  tableBodyClassName?: string;
  isLoading?: boolean;
  externalRef?: React.Ref<{
    scrollToIndex: (index: number, divId?: string) => void;
  }>;
}

function VirtualizedDataTableList<TData>({
  table,
  tableToolbar,
  tableFooter,
  tableCellClassName,
  tableHeadClassName,
  tableBodyClassName,
  externalRef,
  isLoading,
}: DataTableProps<TData>) {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-1 flex-col overflow-auto">
      {tableToolbar}
      <div
        className=""
        ref={tableContainerRef}
        style={{
          overflow: "auto", //our scrollable table container
          position: "relative", //needed for sticky header
        }}
      >
        <table
          className="w-full"
          style={{
            display: "grid",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead
            style={{
              display: "grid",
              position: "sticky",
              top: 0,
              zIndex: 10, // ensure the header is above other content
            }}
            className={cn("bg-common-background", tableHeadClassName)}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} style={{ display: "flex", width: "100%" }}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      style={{
                        display: "flex",
                        width: header.getSize(),
                      }}
                      className={cn(
                        "text-nowrap bg-common-background px-4 py-3 text-left align-middle text-sm font-medium text-neutral-dark-600 shadow-bottom-table-row hover:bg-common-surfaceOverlay",
                      )}
                    >
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <TableBody
            table={table}
            tableContainerRef={tableContainerRef}
            tableCellClassName={tableCellClassName}
            tableBodyClassName={tableBodyClassName}
            externalRef={externalRef}
            isLoading={isLoading}
          />
        </table>
      </div>
      {tableFooter && (
        <div className="mt-3 flex w-full items-center justify-end gap-2">{tableFooter}</div>
      )}
    </div>
  );
}

export default VirtualizedDataTableList;

interface TableBodyProps<TData> {
  table: Table<TData>;
  tableContainerRef: React.RefObject<HTMLDivElement>;
  tableCellClassName?: string;
  tableBodyClassName?: string;
  externalRef?: React.Ref<{
    scrollToIndex: (index: number, divId?: string) => void;
  }>;
  isLoading?: boolean;
}
function TableBody<TData>({
  table,
  tableContainerRef,
  tableCellClassName,
  tableBodyClassName,
  externalRef,
  isLoading,
}: TableBodyProps<TData>) {
  const { rows } = table.getRowModel();

  // Important: Keep the row virtualizer in the lowest component possible to avoid unnecessary re-renders.
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 195, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    overscan: 10, //increase overscan for smoother scrolling
    isScrollingResetDelay: 150, //reduce delay for faster reset
    measureElement:
      typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    // Add performance optimizations
    lanes: 1, //single lane for better performance
    debug: false, //disable debug in production
  });

  useImperativeHandle(externalRef, () => ({
    scrollToIndex: (index: number, divId?: string) => {
      rowVirtualizer.scrollToIndex(index, { align: "center" });
      if (divId) {
        requestAnimationFrame(() => {
          const element = document.getElementById(divId);
          if (element) {
            element.scrollIntoView({ block: "center", behavior: "smooth" });
          }
        });
      }
    },
  }));

  if (isLoading) {
    return (
      <tbody>
        {Array.from({ length: 10 }).map((_, idx) => (
          <tr key={idx} className="flex w-full animate-pulse border-b border-neutral-dark-200">
            {table.getAllColumns().map((_, colIdx) => (
              <td key={colIdx} className={cn("!px-4 !py-3")} style={{ flex: 1 }}>
                <div className="h-4 w-full rounded bg-neutral-dark-100" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <tbody
      style={{
        display: "grid",
        height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
        position: "relative", //needed for absolute positioning of rows
      }}
      className={cn("", tableBodyClassName)}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<TData>;
        return (
          <TableBodyRow
            key={row.id}
            row={row}
            virtualRow={virtualRow}
            rowVirtualizer={rowVirtualizer}
            tableCellClassName={tableCellClassName}
          />
        );
      })}
    </tbody>
  );
}

interface TableBodyRowProps<TData> {
  row: Row<TData>;
  virtualRow: VirtualItem;
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  tableCellClassName?: string;
}

function TableBodyRow<TData>({
  row,
  virtualRow,
  rowVirtualizer,
  tableCellClassName,
}: TableBodyRowProps<TData>) {
  return (
    <tr
      data-index={virtualRow.index} //needed for dynamic row height measurement
      ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
      key={row.id}
      style={{
        display: "flex",
        position: "absolute",
        transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
        width: "100%",
      }}
      className="data-[state=selected]:bg-muted border-b border-neutral-dark-200 text-neutral-light-400 transition-colors hover:bg-common-surfaceOverlay/50"
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <td
            key={cell.id}
            style={{
              display: "flex",
              width: cell.column.getSize(),
            }}
            className={cn(
              "border-b border-neutral-dark-200 px-4 py-3 text-sm text-neutral-dark-600",
              tableCellClassName,
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
}
