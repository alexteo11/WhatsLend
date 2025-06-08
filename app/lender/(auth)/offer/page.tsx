"use client";

import React, { useMemo, useState } from "react";
import { OfferData } from "@/schemas/offer.schema";
import { useLenderOfferQuery } from "@/queries/lender/use-lender-offer-query";
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
import { DateRangePicker } from "@/app/components/lib/date-range-picker";
import { OFFER_STATUS_ENUM } from "@/constants/commonEnums";
import { addDays } from "date-fns";
import { LoanDataTableFilter } from "@/types/dataTable.types";
import { useAuth } from "@/context/auth.context";

const OfferPage = () => {
  const { lenderId } = useAuth();
  const [selectedRow, setSelectedRow] = useState<OfferData | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [filter, setFilter] = useState<LoanDataTableFilter>({
    status: "all",
    date: {
      from: new Date(new Date().setHours(0, 0, 0, 0)),
      to: addDays(new Date().setHours(23, 59, 59, 999), 1),
    },
    keyword: undefined,
  });
  const { data, isFetching } = useLenderOfferQuery(lenderId, filter);

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
    <div>
      <h1 className="lender-page-title">Offer</h1>
      <MyDataTable
        data={filteredData}
        columns={getDataColumns<OfferData>([
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
              status: value as NonNullable<LoanDataTableFilter["status"]>,
            });
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

export default OfferPage;
