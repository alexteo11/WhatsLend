"use client";

import React, { useState } from "react";
import { userLenderPaymentsQuery } from "@/queries/lender/use-lender-payments-query";
import { LoaderWrapper } from "@/app/components/common/LoaderWrapper";
import { Payment, PaymentStatus } from "@/schemas/payment.schema";
import { MyDataTable } from "@/app/components/data-display/my-data-table";
import { DateRangePicker } from "@/app/components/lib/date-range-picker";
import { PaymentDataTableFilter } from "@/types/dataTable.types";
import {
  getDataColumns,
  renderDataTableActionButtons,
} from "@/app/components/data-display/my-data-columns";
import { formatDate } from "@/helper/dateFormatter";
import useDialogStore from "@/stores/useDialogStore";
import PaymentDialog from "./payment-dialog";

const PaymentPage = () => {
  const [filter, setFilter] = useState<PaymentDataTableFilter>({});
  const { data, isLoading, isFetching } = userLenderPaymentsQuery(
    filter?.date
      ? {
          startDate: filter?.date?.from?.toISOString() ?? "",
          endDate: filter?.date?.to?.toISOString() ?? "",
        }
      : undefined,
  );

  const showDialog = (selectedPayment: Payment) => {
    const { openDialog } = useDialogStore.getState();
    openDialog(<PaymentDialog selectedPayment={selectedPayment} />);
  };

  const onRowClick = (row: Payment) => {
    showDialog(row);
  };

  if (!data) {
    return (
      <LoaderWrapper isLoading={isLoading}>
        <div />
      </LoaderWrapper>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="lender-page-title">Payments</h1>

      <MyDataTable
        data={data}
        columns={getDataColumns<Payment>([
          {
            key: "title",
            title: "Title",
            size: 300,
            cell: ({ row }) => {
              return (
                <div>Payment bill for {formatDate(row.original.createdAt)}</div>
              );
            },
          },
          {
            key: "amount",
            title: "Amount",
            isSortable: true,
            isCenterText: true,
          },
          {
            key: "status",
            title: "Status",
            isCenterText: true,
          },
          {
            key: "createdAt",
            title: "Created At",
            isSortable: true,
            isDateText: true,
            size: 200,
          },
          {
            key: "updatedAt",
            title: "Updated At",
            isSortable: true,
            isDateText: true,
            size: 200,
          },
          {
            key: "actions",
            title: "Actions",
            size: 80,
            cell: ({ row }) => {
              const buttons = [];

              if (row.original.status === PaymentStatus.UNPAID) {
                buttons.push({
                  label: "Mark as paid",
                  action: (row: Payment) => showDialog(row),
                });
              } else {
                buttons.push({
                  label: "View payment details",
                  action: (row: Payment) => showDialog(row),
                });
              }

              return renderDataTableActionButtons(
                "Actions",
                row.original,
                buttons,
              );
            },
          },
        ])}
        isLoading={isFetching}
        onRowClick={onRowClick}
      >
        <div className="flex-auto" />
        <DateRangePicker
          date={filter.date}
          onDateChange={(date) => {
            if (date) {
              setFilter({
                ...filter,
                date,
              });
            }
          }}
          className="flex-auto"
        />
      </MyDataTable>
    </div>
  );
};

export default PaymentPage;
