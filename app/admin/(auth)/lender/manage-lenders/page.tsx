"use client";

import { useMemo, useState } from "react";
import { MyDataTable } from "@/app/components/data-display/my-data-table";
import { LendersDataTableFilter } from "@/types/dataTable.types";
import {
  getDataColumns,
  renderDataTableActionButtons,
} from "@/app/components/data-display/my-data-columns";
import { Input } from "@/app/components/lib/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/lib/select";
import { useAdminGetLendersQuery } from "@/queries/admin/use-admin-get-lenders-query";
import { Lender, LenderStatus } from "@/schemas/lender.schema";
import { LenderStaff } from "@/schemas/lenderStaff.schema";
import { LenderStatusMapping } from "@/constants/statusMapping";
import { Button } from "@/app/components/lib/button";
import Link from "next/link";
import { Plus } from "lucide-react";

const ManageLendersPage = () => {
  const [filter, setFilter] = useState<LendersDataTableFilter>({
    status: "all",
  });
  const { data, isFetching } = useAdminGetLendersQuery(filter);

  const filteredData = useMemo(() => {
    if (!data) {
      return [];
    }
    if (filter?.keyword) {
      const _keyword = filter.keyword;
      return data.filter((item) => item.name.toLowerCase().includes(_keyword));
    }
    return data;
  }, [data, filter?.keyword]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="lender-page-title">Manage Lenders</h1>
      <MyDataTable
        data={filteredData}
        columns={getDataColumns<Lender & { staff: LenderStaff[] }>([
          {
            key: "name",
            title: "Name",
          },
          {
            key: "mobileNo",
            title: "Mobile No.",
          },
          {
            key: "address",
            title: "Address",
            size: 200,
          },
          {
            key: "businessRegistrationNumber",
            title: "Business Register No.",
            isCenterText: true,
          },
          {
            key: "licenseNumberAndYear",
            title: "License No.",
            isCenterText: true,
          },

          {
            key: "staffCount",
            title: "Staff Count",
            isCenterText: true,
            cell: ({ row }) => {
              return (
                <div className="text-center">{row.original.staff.length}</div>
              );
            },
            size: 100,
          },
          {
            key: "status",
            title: "Status",
            isCenterText: true,
            cell: ({ row }) => {
              return (
                <div className="text-center capitalize">
                  {LenderStatusMapping[row.original.status]}
                </div>
              );
            },
          },
          {
            key: "licenseExpiryDate",
            title: "License Expiry Date",
            isDateText: true,
            isSortable: true,
            isCenterText: true,
          },
          {
            key: "createdAt",
            title: "Created At",
            isCenterText: true,
            isSortable: true,
            isDateText: true,
          },
          {
            key: "updatedAt",
            title: "Updated At",
            isCenterText: true,
            isSortable: true,
            isDateText: true,
          },
          {
            key: "actions",
            title: "Actions",
            size: 80,
            cell: ({ row }) =>
              renderDataTableActionButtons("Actions", row.original, [
                {
                  label: "View Appointment", // TODO: test
                  action: (row) => console.log(row),
                },
                {
                  label: "Set Appointment Status", // TODO: test
                  action: (row) => console.log(row),
                },
              ]),
          },
        ])}
        isLoading={isFetching}
        onRowClick={(row) => {
          // setSelectedRow(row);
          // setShowDialog(true);
        }}
      >
        <div> Search: </div>
        <Input
          className="w-auto"
          placeholder="Search by lender name"
          value={filter.keyword || ""}
          onChange={(e) => {
            setFilter({
              ...filter,
              keyword: e.target.value,
            });
          }}
        />
        <div>Status: </div>
        <Select
          defaultValue="all"
          onValueChange={(value) => {
            setFilter({
              ...filter,
              status: value as NonNullable<LendersDataTableFilter["status"]>,
            });
          }}
        >
          <SelectTrigger className="w-[150px] rounded-md border px-3 py-2">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value={LenderStatus.ACTIVE}>Active</SelectItem>
            <SelectItem value={LenderStatus.INACTIVE}>Inactive</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-auto"></div>
        <Button asChild>
          <Link href="./manage-lenders/add-lender">
            <span>Add Lender </span>
            <Plus />
          </Link>
        </Button>
      </MyDataTable>
    </div>
  );
};

export default ManageLendersPage;
