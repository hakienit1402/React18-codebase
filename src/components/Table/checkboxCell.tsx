import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/Checkbox";

const checkboxCell = <TValues,>(
  id: string,
  options?: Partial<ColumnDef<TValues>>,
): ColumnDef<TValues> => {
  return {
    id,
    header: ({ table }) => {
      const rows = table.getRowModel().rows;

      if (!rows?.length) {
        return null;
      }
      const cells = rows?.map((i) => i.original);

      const disabledCells = cells.filter(
        (ele) => ele && typeof ele === "object" && "approveAllowed" in ele && !ele.approveAllowed,
      );
      const isDisabled = !!disabledCells.length;

      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-slate-40 translate-y-[2px]"
          {...(isDisabled && { disabled: true })}
        />
      );
    },
    cell: ({ row }) => {
      const original = row.original as Record<string, unknown> | undefined;
      const isDisabled = Boolean(
        original &&
          typeof original === "object" &&
          "approveAllowed" in original &&
          original.approveAllowed === false,
      );
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
          {...(isDisabled && { disabled: true })}
        />
      );
    },
    ...options,
  };
};

export default checkboxCell;

export const checkboxCellCustom = <TValues,>(
  id: string,
  options?: Partial<ColumnDef<TValues>>,
  extendCheckboxChange?: {
    onCheckedAllChange: (value: boolean, itemsSelected: TValues[]) => void;
    onCheckedRowChange: (value: boolean, itemSelected: TValues) => void;
  },
): ColumnDef<TValues> => {
  return {
    id,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
          //get all rows of table
          const itemsSelected = table.getFilteredRowModel().rows.map((row) => row.original);
          if (extendCheckboxChange) {
            extendCheckboxChange?.onCheckedAllChange(!!value, itemsSelected);
          }
        }}
        aria-label="Select all"
        className="border-slate-40 translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
          if (extendCheckboxChange) {
            extendCheckboxChange?.onCheckedRowChange(!!value, row.original);
          }
        }}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    ...options,
  };
};
