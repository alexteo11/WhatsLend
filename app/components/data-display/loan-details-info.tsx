import { LoanData } from "@/schemas/loan.schema";
import React from "react";
import DataDetailsSection, { Row } from "./data-details-section";
import DataDetailsTableView from "@/app/components/data-display/data-details-table-view";
import { formatDate } from "@/helper/dateFormatter";
import { currencyFormatter, monthFormatter } from "@/helper/numberFormatter";
import { Path } from "react-hook-form";
import { foreignIdType } from "@/constants/formOptions";

const LoanDetailsInfo = ({ loanData }: { loanData: LoanData }) => {
  const rows: {
    [K in Path<LoanData["personalDetails"]>]: Row<
      LoanData["personalDetails"],
      K
    >;
  }[Path<LoanData["personalDetails"]>][] = [
    { title: "NRIC/FIN", path: "uinfin.value" },
    { title: "Full Name", path: "fullName.value" },
    { title: "Gender", path: "sex.label" },
    { title: "Nationality", path: "nationality.label" },
    { title: "Date of Birth", path: "dob.value", formatter: formatDate },
    { title: "Birth Country", path: "birthCountry.label" },
    { title: "Race", path: "race.label" },
    { title: "Residential Status", path: "residentialStatus.label" },
    { title: "Marital Status", path: "maritalStatus.label" },
    { title: "ID Type", path: "idType.label" },
  ];

  if (loanData.personalDetails?.idType?.value === foreignIdType) {
    rows.push(
      { title: "Pass Type", path: "passType.label" },
      { title: "Pass Status", path: "passStatus.value" },
      {
        title: "Pass Expiry Date",
        path: "passExpiryDate.value",
        formatter: formatDate,
      },
    );
  }

  return (
    <>
      <DataDetailsSection
        title="Personal Details"
        data={loanData.personalDetails}
        rows={rows}
      />

      <br />
      <DataDetailsSection
        title="Loan Details"
        data={loanData.loanDetails}
        rows={[
          {
            title: "Loan Amount",
            path: "loanAmount.value",
            formatter: currencyFormatter,
          },
          {
            title: "Loan Tenure",
            path: "loanTenure.value",
            formatter: monthFormatter,
          },
          { title: "Loan Purpose", path: "loanPurpose.value" },
        ]}
      />

      <br />
      <DataDetailsSection
        title="Contact Details"
        data={loanData.contactDetails}
        rows={[
          { title: "Email", path: "email.value" },
          { title: "Mobile No.", path: "mobileNo.value" },
        ]}
      />

      <br />
      <DataDetailsSection
        title="Employment Details"
        data={loanData.employmentDetails}
        rows={[
          { title: "Occupation", path: "occupation.value" },
          { title: "Employment Status", path: "employmentStatus.label" },
          {
            title: "Latest 3 Month Income 1",
            path: "monthlyIncome1.value",
            formatter: currencyFormatter,
          },
          {
            title: "Latest 3 Month Income 2",
            path: "monthlyIncome2.value",
            formatter: currencyFormatter,
          },
          {
            title: "Latest 3 Month Income 3",
            path: "monthlyIncome3.value",
            formatter: currencyFormatter,
          },
          {
            title: "Total Latest 3 Month Income",
            path: "totalMonthlyIncome.value",
            formatter: currencyFormatter,
          },
          { title: "Employer Name", path: "employerName.value" },
          { title: "Employment Sector", path: "employmentSector.value" },
          {
            title: "Time At Current Employer",
            path: "timeAtCurrentEmployer.label",
          },
          {
            title: "Time At Previous Employer",
            path: "timeAtPreviousEmployer.label",
          },
          {
            title: "Office Address",
            path: "officeAddress.value",
          },
          {
            title: "Office Unit No",
            path: "officeUnitNo.value",
          },
          {
            title: "Office Postal Code",
            path: "officePostalCode.value",
          },
        ]}
      />

      <br />
      <DataDetailsSection
        title="Housing Details"
        data={loanData.housingDetails}
        rows={[
          { title: "Address", path: "address.value" },
          { title: "Unit No.", path: "unitNo.value" },
          { title: "Postal Code", path: "postalCode.value" },
          { title: "Country", path: "country.label" },
          { title: "Type of Housing", path: "housingType.label" },
          { title: "Housing Status", path: "housingStatus.label" },
          {
            title: "Has Own Private Property",
            path: "hasOwnPrivateProperty.value",
            formatter: (value) => (value ? "Yes" : "No"),
          },
        ]}
      />
      <DataDetailsTableView data={loanData} />

      <br />
      <DataDetailsSection
        title="Existing Loan Details"
        data={loanData.existingLoanDetails}
        rows={[
          {
            title: "Is Contacting with other agency?",
            path: "isContactingWithAgency.label",
          },
          { title: "Has existing loans?", path: "hasExistingLoans.label" },

          ...((loanData.existingLoanDetails.hasExistingLoans.value
            ? [
                {
                  title: "Existing loan from bank",
                  path: "existingLoanFromBank.value",
                  formatter: currencyFormatter,
                },
                {
                  title: "Existing loan from non-bank",
                  path: "existingLoanFromNonBank.value",
                  formatter: currencyFormatter,
                },
                {
                  title: "Monthly repayment to bank",
                  path: "monthlyRepaymentToBank.value",
                  formatter: currencyFormatter,
                },
                {
                  title: "Monthly repayment to non-bank",
                  path: "monthlyRepaymentToNonBank.value",
                  formatter: currencyFormatter,
                },
              ]
            : []) as Row<
            typeof loanData.existingLoanDetails,
            Path<typeof loanData.existingLoanDetails>
          >[]),
        ]}
      />
    </>
  );
};

export default LoanDetailsInfo;
