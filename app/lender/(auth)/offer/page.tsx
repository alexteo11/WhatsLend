"use client";

import React, { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { PaginationState, SortingState } from "@tanstack/react-table";
import OfferDetailDialog from "../offer-detail-dialog";
import { OfferData } from "@/schemas/offer.schema";
import { OFFER_STATUS_ENUM } from "@/constants/commonEnums";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sampleData: any = {
  personalDetails: {
    uinfin: "S1234567A",
    occupation: "Software Engineer",
    fullName: "John Doe",
    sex: "Male",
    nationality: "Singaporean",
    dob: new Date("1990-01-01"),
    race: "Chinese",
    birthCountry: "Singapore",
    regadd: {
      blkNo: "123",
      buildingName: "ABC Building",
      floorNo: "05",
      postalCode: "123456",
      streetName: "ABC Street",
      unitNo: "01-01",
    },
    residentialStatus: "Singaporean",
    passType: "N.A.",
    passStatus: "N.A.",
    passExpiryDate: new Date("2030-01-01"),
    maritalStatus: "Single",
  },
  contactDetails: {
    email: "john@example.com",
    mobileNo: "91234567",
  },
  employmentDetails: {
    employerName: "ABC Company",
    employmentSector: "IT",
  },
  propertyDetails: {
    hoousingType: "HDB",
    hdbType: "3-Room",
    hdbOwnership: "Owner",
  },
  cpfDetails: {
    cpfContributions: [
      {
        month: "2022-01",
        contribution: 1000,
      },
      {
        month: "2022-02",
        contribution: 1000,
      },
    ],
    cpfHousingWithdrawal: [
      {
        month: "2022-01",
        amount: 5000,
      },
      {
        month: "2022-02",
        amount: 5000,
      },
    ],
    noaHistory: [
      {
        month: "2022-01",
        amount: 10000,
      },
      {
        month: "2022-02",
        amount: 10000,
      },
    ],
  },
  vehicleDetails: {
    effectiveOwnership: [
      {
        vehicleType: "Car",
        vehicleMake: "Toyota",
        vehicleModel: "Corolla",
        vehicleYear: 2015,
        vehicleRegNo: "SDE1234A",
        vehicleCOEExpiry: new Date("2025-01-01"),
      },
    ],
  },
};

const OfferPage = () => {
  const _data = Array.from({ length: 20 }).map((_, i) => ({
    id: Math.random().toString(36).substring(2, 10),
    email: `m${i}@example.com`,
    status: Object.values(OFFER_STATUS_ENUM)[
      Math.floor(Math.random() * Object.values(OFFER_STATUS_ENUM).length)
    ] as OFFER_STATUS_ENUM,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    stillValid: Boolean(Math.round(Math.random())),
    lender_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    loan_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    loanAmount: Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
    interestRate: Math.random() / 100,
    adminFee: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    lateInterestRate: Math.random() / 100,
    lateCharges: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    tenureMonths: Math.floor(Math.random() * (24 - 12 + 1)) + 12,
    repaymentPeriod: Math.floor(Math.random() * (24 - 12 + 1)) + 12,
  })) as OfferData[];

  const [data, setData] = useState<OfferData[]>([]);
  const [selectedRow, setSelectedRow] = useState<OfferData | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const fetchData = React.useCallback(
    async (pagination: PaginationState, sorting: SortingState) => {
      const { pageIndex, pageSize } = pagination;
      console.log("gg", pagination, sorting);
      const res = _data.slice(
        pageIndex * pageSize,
        pageIndex * pageSize + pageSize,
      );

      await new Promise((resolve) => {
        setTimeout(() => {
          setData(res);
          resolve(true);
        }, 1000);
      });
    },
    [_data],
  );

  return (
    <div>
      <h1 className="lender-page-title">Offer</h1>
      <DataTable
        data={data}
        columns={columns}
        fetchData={fetchData}
        onRowClick={(row) => {
          setSelectedRow(row);
          setShowDialog(true);
        }}
      />
      {/* <DataTablePagination table={table} /> */}
      <OfferDetailDialog
        isOpen={showDialog}
        onOpenChange={setShowDialog}
        offerData={selectedRow || _data[0]}
        loanData={sampleData}
      />
    </div>
  );
};

export default OfferPage;
