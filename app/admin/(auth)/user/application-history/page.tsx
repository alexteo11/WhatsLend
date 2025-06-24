"use client";

import React, { useMemo, useState } from "react";
import LoanOfferDetailsDialog from "@/app/components/data-display/loan-offer-details-dialog";
import { MyDataTable } from "@/app/components/data-display/my-data-table";
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
import {
  DateRangePicker,
  DateRangeType,
} from "@/app/components/lib/date-range-picker";
import { LOAN_STATUS_ENUM } from "@/constants/commonEnums";
import { UserApplicationHistoryDataTableFilter } from "@/types/dataTable.types";
import { useAdminGetApplicationHistoryQuery } from "@/queries/admin/use-admin-get-application-history-query";
import { LoanData } from "@/schemas/loan.schema";
import { getLast30Days } from "@/helper/dateFormatter";
import { LoanStatusMapping } from "@/constants/statusMapping";

const ApplicationHistoryPage = () => {
  const [selectedRow, setSelectedRow] = useState<LoanData | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [filter, setFilter] = useState<UserApplicationHistoryDataTableFilter>({
    status: "all",
    date: getLast30Days(),
    keyword: undefined,
  });
  const { data, isFetching } = useAdminGetApplicationHistoryQuery(filter);

  const filteredData = useMemo(() => {
    if (!data) {
      return [];
    }
    if (filter?.keyword) {
      const _keyword = filter.keyword;
      return data.filter((item) =>
        item.contactDetails.email?.value?.toLowerCase().includes(_keyword),
      );
    }
    return data;
  }, [data, filter?.keyword]);

  return (
    <div>
      <h1 className="lender-page-title">Offer</h1>
      <MyDataTable
        data={filteredData}
        columns={getDataColumns<LoanData>([
          {
            key: "contactDetails.email.value",
            title: "Email",
            size: 200,
          },
          {
            key: "loanDetails.loanAmount.value",
            title: "Loan Amount",
            isSortable: true,
            isCenterText: true,
          },
          {
            key: "loanDetails.loanTenure.value",
            title: "Loan Tenure",
            isSortable: true,
            isCenterText: true,
          },
          {
            key: "status",
            title: "Status",
            cell: ({ row }) => {
              return <div>{LoanStatusMapping[row.original.status]}</div>;
            },
          },
          {
            key: "createdAt",
            title: "Created At",
            isDateText: true,
          },
          {
            key: "updatedAt",
            title: "Updated At",
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
          setSelectedRow(row);
          setShowDialog(true);
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
              status: value as NonNullable<
                UserApplicationHistoryDataTableFilter["status"]
              >,
            });
          }}
        >
          <SelectTrigger className="w-[150px] rounded-md border px-3 py-2">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value={LOAN_STATUS_ENUM.INITIAL}>Initial</SelectItem>
            <SelectItem value={LOAN_STATUS_ENUM.IN_PROGRESS}>
              In Progress
            </SelectItem>
            <SelectItem value={LOAN_STATUS_ENUM.EXPIRED}>Expired</SelectItem>
            <SelectItem value={LOAN_STATUS_ENUM.CANCELLED}>
              Cancelled
            </SelectItem>
            <SelectItem value={LOAN_STATUS_ENUM.COMPLETED}>
              Completed
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-auto" />
        <DateRangePicker
          date={filter.date}
          onDateChange={(date) => {
            if (date) {
              setFilter({
                ...filter,
                date: date,
              });
            }
          }}
          className="flex-auto"
          selectedDateRangeType={DateRangeType.LAST_30_DAYS}
        />
      </MyDataTable>

      <LoanOfferDetailsDialog
        isOpen={showDialog}
        onOpenChange={setShowDialog}
        loanData={selectedRow || filteredData[0]}
      />
    </div>
  );
};

export default ApplicationHistoryPage;
