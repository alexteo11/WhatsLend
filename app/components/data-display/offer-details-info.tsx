import { OfferData } from "@/schemas/offer.schema";
import React from "react";
import DataDetailsSection from "./data-details-section";
import { formatDate } from "@/helper/dateFormatter";
import {
  currencyFormatter,
  monthFormatter,
  percentageFormatter,
} from "@/helper/numberFormatter";

const OfferDetailInfo = ({ offerData }: { offerData: OfferData }) => {
  return (
    <>
      <DataDetailsSection
        title=""
        data={offerData}
        rows={[
          { title: "User email", path: "email" },
          {
            title: "Loan Amount",
            path: "loanAmount",
            formatter: currencyFormatter,
          },
          {
            title: "Tenure Months",
            path: "tenureMonths",
            formatter: monthFormatter,
          },
          {
            title: "Interest Rate",
            path: "interestRate",
            formatter: percentageFormatter,
          },
          {
            title: "Admin Fee",
            path: "adminFee",
            formatter: currencyFormatter,
          },
          {
            title: "Late Interest Rate",
            path: "lateInterestRate",
            formatter: percentageFormatter,
          },
          {
            title: "Late Charges Fees",
            path: "lateChargeFees",
            formatter: currencyFormatter,
          },
          {
            title: "Repayment Period",
            path: "repaymentPeriod",
            formatter: monthFormatter,
          },
          {
            title: "Created At",
            path: "createdAt",
            formatter: formatDate,
          },
          {
            title: "Updated At",
            path: "updatedAt",
            formatter: formatDate,
          },
        ]}
      />
    </>
  );
};

export default OfferDetailInfo;
