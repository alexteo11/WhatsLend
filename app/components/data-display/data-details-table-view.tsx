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
import { formatDate } from "@/helper/dateFormatter";

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
              title: "HDB Type",
            },
            {
              title: "Date Of Purchase",
            },
            {
              title: "Monthly Loan Instalment ($)",
            },
            {
              title: "Outstanding Loan Balance ($)",
            },
          ]}
          rows={
            data.housingDetails?.hdbOwnership?.map((ownership) => {
              if (!ownership) {
                return [];
              }
              const temp = {
                item1: ownership.hdbType,
                item2: ownership.dateOfPurchase,
                item3: ownership.monthlyLoanInstalment,
                item4: ownership.outstandingLoanBalance,
              };

              return Object.entries(temp).map(([_, item]) => {
                if (!item) {
                  return "";
                }
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
                title: "Amount ($)",
              },
            ]}
            rows={
              data.cpfDetails?.cpfContributions?.map((contri) => {
                if (!contri) {
                  return [];
                }

                const temp = {
                  item1: contri.month,
                  item2: contri.employer,
                  item3: contri.date,
                  item4: contri.amount,
                };

                return Object.entries(temp).map(([_, item]) => {
                  return item?.value || "";
                });
              }) || []
            }
          />
          <br />
          <DataTableView
            tableName="CPF Housing Withdrawal"
            columns={[
              {
                title: "Accrued Interest Amount ($)",
              },
              {
                title: "Principal Withdrawal Amount ($)",
              },
              {
                title: "Total Amount of CPF Allowed For Property ($)",
              },
              {
                title: "Monthly Installment Amount ($)",
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

      {data.cpfDetails?.noaHistory?.length ? (
        <NoaTable
          data={
            data.cpfDetails.noaHistory as LoanData["cpfDetails"]["noaHistory"]
          }
        />
      ) : null}

      {data.vehicleDetails?.length ? (
        <>
          <br />
          <h1 className="text-xl font-bold underline">Vehicles</h1>
          <DataTableView
            tableName="Vehicles Details"
            columns={[
              {
                title: "Vehicles #",
              },
              {
                title: "Effective Date / Time of Ownership",
              },
            ]}
            rows={data.vehicleDetails.map((vehicleDetails, index) => {
              if (!vehicleDetails) {
                return [];
              }
              return [
                `Vehicles ${index + 1}`,
                formatDate(vehicleDetails.effectiveOwnership?.value),
              ];
            })}
          />
        </>
      ) : null}
    </>
  );
};

const NoaTable = ({ data }: { data: LoanData["cpfDetails"]["noaHistory"] }) => {
  const Content = (content: LoanData["cpfDetails"]["noaHistory"][number]) => {
    return (
      <div className="border-1 flex w-full flex-col gap-2 border border-black p-3">
        {!content ? (
          <div className="flex h-full items-center justify-center text-light-gray">
            <span>No data</span>
          </div>
        ) : (
          <>
            <span className="text-sm font-semibold underline">
              Year of Assessment - {content.yearOfAssessment.value}
            </span>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="font-semibold">Type: </div>
              <div>{content.category.value}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="font-semibold">Assesssable Income: </div>
              <div>$ {content.amount.value}</div>
            </div>

            <div className="mt-2 text-sm text-light-gray">
              Income Breakdown{" "}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="font-semibold">Employment: </div>
              <div>$ {content.employment.value || "0"}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="font-semibold">Trade: </div>
              <div>$ {content.trade.value || "0"}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="font-semibold">Rent: </div>
              <div>$ {content.rent.value || "0"}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="font-semibold">Interest: </div>
              <div>$ {content.interest.value || "0"}</div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      <br />
      <h1 className="text-xl font-bold underline">Notice of Assessment</h1>
      <br />
      <div className="flex flex-row gap-2">
        {Content(data?.[0])}
        {Content(data?.[1])}
      </div>
    </div>
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
