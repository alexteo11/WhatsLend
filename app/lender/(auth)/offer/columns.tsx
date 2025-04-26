"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
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
import { OfferData } from "@/schemas/offer.schema";

const SortableColumn = ({
  column,
  title,
}: {
  column: Column<OfferData>;
  title: string;
}) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const columns: ColumnDef<OfferData>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "loanAmount",
    header: ({ column }) => SortableColumn({ column, title: "Loan Amount" }),
    cell: ({ row }) => {
      return <div className="text-center">{row.original.loanAmount}</div>;
    },
  },
  {
    accessorKey: "loanTenure",
    header: ({ column }) => SortableColumn({ column, title: "Loan Tenure" }),
    cell: ({ row }) => {
      return <div className="text-center">{row.original.tenureMonths}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => SortableColumn({ column, title: "Created At" }),
    cell: ({ row }) => {
      return formatDate(row.original.createdAt);
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => SortableColumn({ column, title: "Updated At" }),
    cell: ({ row }) => {
      return formatDate(row.original.updatedAt);
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
