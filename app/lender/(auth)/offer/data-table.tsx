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
  ColumnSort,
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
import { OFFER_STATUS_ENUM } from "@/constants/commonEnums";

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading: boolean;
  onRowClick: (data: TData) => void;
  onFilterChange: (filter: LoanOfferFilter) => void;
}

// interface Filter {
// pagination: PaginationState;
// sorting: ColumnSort;
// }

// export interface LoanOfferFilter extends Filter {
export interface LoanOfferFilter {
  keyword?: string;
  date?: DateRange;
  status?: OFFER_STATUS_ENUM & "all";
}

// https://tanstack.com/table/v8/docs/api/features/pagination
export function DataTable<TData, TValue>({
  data,
  columns,
  isLoading,
  onRowClick,
  onFilterChange,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "createdAt",
      desc: true,
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // manualPagination: true,
    // manualSorting: true,
    pageCount: Math.ceil(data.length / pagination.pageSize) || 1,
    autoResetAll: false,
    onPaginationChange: (data) => {
      setPagination(data);
    },
    getPaginationRowModel: getPaginationRowModel(),
    // onSortingChange: (item) => {
    //   setSorting(item);
    // },
    onSortingChange: setSorting,
    // enableMultiSort: false,
    // enableSorting: false, // TODO: update in future
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination,
    },
  });

  const [keyword, setKeyword] = React.useState("");
  const [status, setStatus] = React.useState<OFFER_STATUS_ENUM & "all">();
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(new Date().setHours(0, 0, 0, 0)),
    to: addDays(new Date().setHours(23, 59, 59, 999), 1),
  });

  React.useEffect(() => {
    onFilterChange({
      keyword,
      status,
      date,
      // pagination,
      // sorting: sorting[0],
    });
  }, [keyword, status, date]);
  // }, [keyword, status, date, pagination.pageIndex, sorting]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 py-4">
        <div> Search: </div>
        <Input
          className="w-auto"
          placeholder="Search by email"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div>Status: </div>
        <Select
          defaultValue="all"
          onValueChange={(value) => {
            setStatus(value as NonNullable<LoanOfferFilter["status"]>);
          }}
        >
          <SelectTrigger className="w-[150px] rounded-md border px-3 py-2">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value={OFFER_STATUS_ENUM.ACCEPTED}>Accepted</SelectItem>
            <SelectItem value={OFFER_STATUS_ENUM.COMPLETED}>
              Completed
            </SelectItem>
            <SelectItem value={OFFER_STATUS_ENUM.EXPIRED}>Expired</SelectItem>
            <SelectItem value={OFFER_STATUS_ENUM.ISSUED}>Issued</SelectItem>
            <SelectItem value={OFFER_STATUS_ENUM.REJECTED}>Rejected</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-auto" />
        <DateRangePicker
          date={date}
          onDateChange={(date) => {
            if (date) {
              setDate(date);
            }
          }}
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
