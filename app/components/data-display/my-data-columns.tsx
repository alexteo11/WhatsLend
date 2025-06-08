import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/lib/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/lib/dropdown-menu";
import { formatDate } from "@/helper/dateFormatter";
import { cn } from "@/lib/utils";

interface DataColumns<TData> {
  key: string;
  title: string; // | ((data: { column: Column<TData> }) => React.ReactNode);
  isSortable?: boolean;
  isCenterText?: boolean;
  isDateText?: boolean;
  cell?: (data: { row: Row<TData> }) => React.ReactNode;
  size?: number;
}

const SortableColumn = <TData,>({
  column,
  title,
  isCenter,
}: {
  column: Column<TData>;
  title: string;
  isCenter?: boolean;
}) => {
  return (
    <div className={cn("flex", isCenter && "items-center justify-center")}>
      <Button
        variant="ghost"
        onClick={() => {
          console.log(column.getIsSorted());
          return column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        {title}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export const getDataColumns = <TData extends Record<string, unknown>>(
  columns: DataColumns<TData>[],
): ColumnDef<TData>[] => {
  return columns.map((col) => {
    const base: ColumnDef<TData> = {
      accessorKey: col.key,
      header: () => (
        <div className={cn("text-left", col.isCenterText && "text-center")}>
          {col.title}
        </div>
      ),
      minSize: col.isDateText ? 200 : 50,
      size: col.size,
      cell: ({ row }) => {
        return (
          <div className="whitespace-break-spaces break-words">
            {String(getObjectNestedValue(row.original, col.key))}
          </div>
        );
      },
    };

    if (col.isSortable) {
      base.header = ({ column }) =>
        SortableColumn({
          column,
          title: String(col.title),
          isCenter: col.isCenterText,
        });
    }

    if (col.cell) {
      base.cell = col.cell;
      return base;
    }

    if (col.isCenterText) {
      base.cell = ({ row }) => {
        return (
          <div className="text-center">
            {String(getObjectNestedValue(row.original, col.key))}
          </div>
        );
      };
    }

    if (col.isDateText) {
      base.cell = ({ row }) => {
        return (
          <div className={cn("", col.isCenterText && "text-center")}>
            {formatDate(
              getObjectNestedValue(row.original, col.key) as unknown as
                | Date
                | string,
            )}
          </div>
        );
      };
    }

    return base;
  });
};

const getObjectNestedValue = (data: Record<string, unknown>, path: string) => {
  return path
    .split(".")
    .reduce(
      (acc: Record<string, unknown> | unknown | undefined, key: string) => {
        if (acc && typeof acc === "object" && key in acc) {
          return acc[key as keyof typeof acc];
        }
        return undefined; // Return `undefined` if any key is missing
      },
      data,
    );
};

export const renderDataTableActionButtons = <TData,>(
  title: string,
  data: TData,
  buttons: {
    label: string;
    action: (data: TData) => void;
  }[],
) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open action menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {buttons.map((button) => {
            return (
              <DropdownMenuItem
                key={button.label}
                onClick={(event) => {
                  event.stopPropagation();
                  button.action(data);
                }}
              >
                {button.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
