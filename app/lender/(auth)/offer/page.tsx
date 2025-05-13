"use client";

import React, { useMemo, useState } from "react";
import { columns } from "./columns";
import { DataTable, LoanOfferFilter } from "./data-table";
import { PaginationState, SortingState } from "@tanstack/react-table";
import OfferDetailInfo from "../../../components/data-display/offer-details-info";
import { OfferData } from "@/schemas/offer.schema";
import { OFFER_STATUS_ENUM } from "@/constants/commonEnums";
import { useLenderOfferQuery } from "@/queries/use-lender-offer-query";
import { useAuth } from "@/context/auth.context";
import LoanOfferDetailsDialog from "@/app/components/data-display/loan-offer-details-dialog";

 
// const sampleData: any = {
//   personalDetails: {
//     uinfin: "S1234567A",
//     occupation: "Software Engineer",
//     fullName: "John Doe",
//     sex: "Male",
//     nationality: "Singaporean",
//     dob: new Date("1990-01-01"),
//     race: "Chinese",
//     birthCountry: "Singapore",
//     regadd: {
//       blkNo: "123",
//       buildingName: "ABC Building",
//       floorNo: "05",
//       postalCode: "123456",
//       streetName: "ABC Street",
//       unitNo: "01-01",
//     },
//     residentialStatus: "Singaporean",
//     passType: "N.A.",
//     passStatus: "N.A.",
//     passExpiryDate: new Date("2030-01-01"),
//     maritalStatus: "Single",
//   },
//   contactDetails: {
//     email: "john@example.com",
//     mobileNo: "91234567",
//   },
//   employmentDetails: {
//     employerName: "ABC Company",
//     employmentSector: "IT",
//   },
//   propertyDetails: {
//     hoousingType: "HDB",
//     hdbType: "3-Room",
//     hdbOwnership: "Owner",
//   },
//   cpfDetails: {
//     cpfContributions: [
//       {
//         month: "2022-01",
//         contribution: 1000,
//       },
//       {
//         month: "2022-02",
//         contribution: 1000,
//       },
//     ],
//     cpfHousingWithdrawal: [
//       {
//         month: "2022-01",
//         amount: 5000,
//       },
//       {
//         month: "2022-02",
//         amount: 5000,
//       },
//     ],
//     noaHistory: [
//       {
//         month: "2022-01",
//         amount: 10000,
//       },
//       {
//         month: "2022-02",
//         amount: 10000,
//       },
//     ],
//   },
//   vehicleDetails: {
//     effectiveOwnership: [
//       {
//         vehicleType: "Car",
//         vehicleMake: "Toyota",
//         vehicleModel: "Corolla",
//         vehicleYear: 2015,
//         vehicleRegNo: "SDE1234A",
//         vehicleCOEExpiry: new Date("2025-01-01"),
//       },
//     ],
//   },
// };

const OfferPage = () => {
  const { user } = useAuth();

  const [selectedRow, setSelectedRow] = useState<OfferData | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [filter, setFilter] = useState<LoanOfferFilter>();

  const { data, isFetching } = useLenderOfferQuery(user?.uid || "", filter);

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
      <DataTable
        data={filteredData}
        columns={columns}
        isLoading={isFetching}
        onRowClick={(row) => {
          setSelectedRow(row);

          console.log({ row });
          setShowDialog(true);
        }}
        onFilterChange={setFilter}
      />

      <LoanOfferDetailsDialog
        isOpen={showDialog}
        onOpenChange={setShowDialog}
        offerData={selectedRow || filteredData[0]}
      />
    </div>
  );
};

export default OfferPage;
