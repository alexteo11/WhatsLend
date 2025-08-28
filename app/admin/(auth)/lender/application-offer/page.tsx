"use client";

import React, { useMemo, useState } from "react";
import { OfferData } from "@/schemas/offer.schema";
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
import { OFFER_STATUS_ENUM } from "@/constants/commonEnums";
import { LoanDataTableFilter } from "@/types/dataTable.types";
import { useAdminGetApplicationOfferQuery } from "@/queries/admin/use-admin-get-application-offer-query";
import { useAdminGetLendersQuery } from "@/queries/admin/use-admin-get-lenders-query";
import { getLast30Days } from "@/helper/dateFormatter";
import { OfferStatusMapping } from "@/constants/statusMapping";

const ApplicationOfferPage = () => {
  const [selectedRow, setSelectedRow] = useState<OfferData | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [filter, setFilter] = useState<LoanDataTableFilter>({
    status: "all",
    date: getLast30Days(),
    lenderId: undefined,
    keyword: undefined,
  });
  const { data: lenderData, isFetching: isFetchingLenders } =
    useAdminGetLendersQuery({ status: "all" });
  const { data, isFetching } = useAdminGetApplicationOfferQuery(filter);

  const _isFetching = useMemo(() => {
    return isFetching || isFetchingLenders;
  }, [isFetching, isFetchingLenders]);

  const filteredData = useMemo(() => {
    if (!data || !lenderData) {
      return [];
    }

    for (const item of data) {
      const lender = lenderData.find((lender) => lender.id === item.lenderId);
      item.lenderName = lender?.name || item.lenderId;
    }

    if (filter?.keyword) {
      const _keyword = filter.keyword;
      return data.filter((item) => {
        if (item.lenderName.toLowerCase().includes(_keyword)) {
          return true;
        }
        if (item.email.toLowerCase().includes(_keyword)) {
          return true;
        }
        return false;
      });
    }
    return data;
  }, [data, lenderData, filter?.keyword]);

  return (
    <div>
      <h1 className="lender-page-title">Offer</h1>
      <MyDataTable
        data={filteredData as (OfferData & { lenderName: string })[]}
        columns={getDataColumns<OfferData & { lenderName: string }>([
          {
            key: "lenderName",
            title: "From Lender",
          },
          {
            key: "email",
            title: "Email",
            size: 200,
          },
          {
            key: "loanAmount",
            title: "Loan Amount",
            isSortable: true,
            isCenterText: true,
          },
          {
            key: "tenureMonths",
            title: "Loan Tenure",
            isSortable: true,
            isCenterText: true,
          },
          {
            key: "status",
            title: "Status",
            cell: ({ row }) => {
              return <div>{OfferStatusMapping[row.original.status]}</div>;
            },
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
        isLoading={_isFetching}
        onRowClick={(row) => {
          setSelectedRow(row);
          setShowDialog(true);
        }}
      >
        <div> Search: </div>
        <Input
          className="w-auto min-w-[200px]"
          placeholder="Search by name or email"
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
              status: value as NonNullable<LoanDataTableFilter["status"]>,
            });
          }}
        >
          <SelectTrigger className="w-[150px] rounded-md border px-3 py-2">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value={OFFER_STATUS_ENUM.BORROWER_ACCEPTED}>
              Borrower Accepted
            </SelectItem>
            <SelectItem value={OFFER_STATUS_ENUM.BORROWER_REJECTED}>
              Borrower Rejected
            </SelectItem>
            <SelectItem value={OFFER_STATUS_ENUM.LENDER_REJECTED}>
              Lender Rejected
            </SelectItem>
            <SelectItem value={OFFER_STATUS_ENUM.COMPLETED}>
              Completed
            </SelectItem>
            <SelectItem value={OFFER_STATUS_ENUM.EXPIRED}>Expired</SelectItem>
            <SelectItem value={OFFER_STATUS_ENUM.ISSUED}>Issued</SelectItem>
          </SelectContent>
        </Select>

        <div>Lender: </div>
        <Select
          onValueChange={(value) => {
            setFilter({
              ...filter,
              lenderId: value,
            });
          }}
        >
          <SelectTrigger className="w-[150px] rounded-md border px-3 py-2">
            <SelectValue placeholder="Select Lender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {lenderData?.map((lender) => (
              <SelectItem key={lender.id} value={lender.id}>
                {lender.name}
              </SelectItem>
            ))}
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
        offerData={selectedRow || filteredData[0]}
      />
    </div>
  );
};

export default ApplicationOfferPage;
