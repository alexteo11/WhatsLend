import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../lib/table";
import { LoanData } from "@/schemas/loan.schema";
import { DeepPartial } from "react-hook-form";
import { FormData } from "@/schemas/form.schema";

const DataDetailsTableView = ({
  data,
}: {
  data?: LoanData | DeepPartial<FormData>;
}) => {
  if (!data) {
    return null;
  }

  return (
    <>
      {data.housingDetails?.hdbOwnership?.length ? (
        <DataTableView
          tableName="HDB Ownership"
          columns={[
            {
              title: "Ownership of Housing",
            },
            {
              title: "HDB Type",
            },
            {
              title: "Date Of Purchase",
            },
          ]}
          rows={
            data.housingDetails?.hdbOwnership?.map((ownership) => {
              if (!ownership) {
                return [];
              }
              return Object.entries(ownership).map(([_, item]) => {
                if ("label" in item && item.label) {
                  return item.label || "";
                }
                return item.value || "";
              });
            }) || []
          }
        />
      ) : null}

      {data.cpfDetails?.cpfContributions?.length ||
      data.cpfDetails?.cpfHousingWithdrawal?.length ? (
        <>
          <br />
          <h1 className="text-xl font-bold underline">CPF Details</h1>
          <DataTableView
            tableName="CPF Contributions"
            columns={[
              {
                title: "Month",
              },
              {
                title: "Employer",
              },
              {
                title: "Date",
              },
              {
                title: "Amount",
              },
            ]}
            rows={
              data.cpfDetails?.cpfContributions?.map((contri) => {
                if (!contri) {
                  return [];
                }
                return Object.entries(contri).map(([_, item]) => {
                  return item.value || "";
                });
              }) || []
            }
          />
          <br />
          <DataTableView
            tableName="CPF Housing Withdrawal"
            columns={[
              {
                title: "Accrued Interest Amount",
              },
              {
                title: "Principal Withdrawal Amount",
              },
              {
                title: "Total Amount of CPF Allowed For Property",
              },
              {
                title: "Monthly Installment Amount",
              },
            ]}
            rows={
              data.cpfDetails?.cpfHousingWithdrawal?.map((withdrawal) => {
                if (!withdrawal) {
                  return [];
                }
                const temp = {
                  item1: withdrawal.accruedInterestAmount,
                  item2: withdrawal.principalWithdrawalAmount,
                  item3: withdrawal.totalAmountOfCpfAllowedForProperty,
                  item4: withdrawal.monthlyInstalmentAmount,
                };
                return Object.entries(temp).map(([_, item]) => {
                  return item?.value || "";
                });
              }) || []
            }
          />
        </>
      ) : null}
    </>
  );
};

const DataTableView = ({
  tableName,
  columns,
  rows,
}: {
  tableName: string;
  columns: Array<{
    title: string;
    className?: string;
  }>;
  rows: Array<Array<string | number>>;
}) => {
  if (!rows.length) {
    return;
  }
  return (
    <>
      <span className="text-sm font-bold">{tableName}</span>
      <Table className="rounded-md border border-r-2 border-light-gray">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.title} className={column.className}>
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row[0]}>
                {row.map((cell) => (
                  <TableCell key={cell}>{cell}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
export default DataDetailsTableView;
