"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  PaginationState,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/lib/table";

import { LoaderWrapper } from "@/app/components/common/LoaderWrapper";
import { DataTablePagination } from "./data-table-pagination";
import { Input } from "@/app/components/lib/input";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/app/components/lib/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/lib/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fetchData: (
    pagination: PaginationState,
    sorting: SortingState,
  ) => Promise<void>;
  onRowClick: (data: TData) => void;
}

// https://tanstack.com/table/v8/docs/api/features/pagination
export function DataTable<TData, TValue>({
  columns,
  data,
  fetchData,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount: 2,
    autoResetAll: false,
    onPaginationChange: (data) => {
      console.log({ data });
      setPagination(data);
      console.log(table.getState().pagination.pageIndex);
    },
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    // getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination,
    },
  });

  const _fetchData = async () => {
    setIsLoading(true);
    try {
      await fetchData(pagination, sorting);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    console.log("why", pagination.pageIndex);

    _fetchData();
  }, [pagination.pageIndex]);

  const [keyword, setKeyword] = React.useState("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 py-4">
        Search:{" "}
        <Input
          className="w-auto"
          placeholder="Search by email"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        Status:{" "}
        <Select
          defaultValue="all"
          onValueChange={(value) => console.log({ value })}
        >
          <SelectTrigger className="w-[150px] rounded-md border px-3 py-2">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-auto" />
        <DateRangePicker
          date={date}
          onDateChange={setDate}
          className="flex-auto"
        />
      </div>
      <DataTablePagination table={table} />
      <div className="rounded-md border">
        <LoaderWrapper isLoading={isLoading} isContainer>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
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
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClick(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </LoaderWrapper>
      </div>
      <DataTablePagination table={table} />
    </>
  );
}
