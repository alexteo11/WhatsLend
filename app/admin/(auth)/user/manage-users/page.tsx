"use client";

import { useMemo, useState } from "react";
import { MyDataTable } from "@/app/components/data-display/my-data-table";
import { UsersDataTableFilter } from "@/types/dataTable.types";
import { useAdminGetUsersQuery } from "@/queries/admin/use-admin-get-users-query";
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
import { User, UserStatus } from "@/schemas/user.schema";

const ManageUsersPage = () => {
  const [filter, setFilter] = useState<UsersDataTableFilter>({
    status: "all",
  });
  const { data, isFetching } = useAdminGetUsersQuery(filter);

  const filteredData = useMemo(() => {
    if (!data) {
      return [];
    }
    if (filter?.keyword) {
      const _keyword = filter.keyword;
      return data.filter((item) => item.email.toLowerCase().includes(_keyword));
    }
    return data;
  }, [data, filter?.keyword]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="lender-page-title">Manage Users</h1>
      <MyDataTable
        data={filteredData}
        columns={getDataColumns<User>([
          {
            key: "email",
            title: "Email",
            size: 200,
          },
          {
            key: "status",
            title: "Status",
          },
          {
            key: "createdAt",
            title: "Created At",
            isSortable: true,
            isDateText: true,
          },
          {
            key: "updatedAt",
            title: "Updated At",
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
          placeholder="Search by email"
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
              status: value as NonNullable<UsersDataTableFilter["status"]>,
            });
          }}
        >
          <SelectTrigger className="w-[150px] rounded-md border px-3 py-2">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value={UserStatus.ACTIVE}>Active</SelectItem>
            <SelectItem value={UserStatus.INACTIVE}>Inactive</SelectItem>
          </SelectContent>
        </Select>
      </MyDataTable>
    </div>
  );
};

export default ManageUsersPage;
