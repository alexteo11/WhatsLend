"use client";

import moment from "moment";
import "./styles.scss";
import {
  Calendar,
  momentLocalizer,
  ToolbarProps,
  View,
  Views,
} from "react-big-calendar";
import { ComponentType, useCallback, useState } from "react";
import { Button } from "@/app/components/lib/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { OfferData } from "@/schemas/offer.schema";
import { OFFER_STATUS_ENUM } from "@/constants/commonEnums";
import OfferDetailDialog from "../offer-detail-dialog";
// import { sampleData } from "../offer/page";

const sampleData = {
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

interface MyEventType {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resourceId: number;
  data: OfferData;
}

const _fakeData = {
  id: "b2b5a9ba-7b39-4cb7-8a6f-6a7d9e2b4c63",
  status: OFFER_STATUS_ENUM.ACCEPTED,
  createdAt: new Date("2024-11-01T12:00:00.000Z"),
  updatedAt: new Date("2024-11-01T12:00:00.000Z"),
  stillValid: true,
  lender_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  loan_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  loanAmount: 1000,
  interestRate: 0.05,
  adminFee: 100,
  lateInterestRate: 0.1,
  lateCharges: 50,
  tenureMonths: 6,
  repaymentPeriod: 12,
};

const events = [
  {
    id: "0",
    title: "user1@gmail.com",
    start: new Date(2025, 3, 1, 9, 0, 0),
    end: new Date(2025, 3, 1, 13, 0, 0),
    resourceId: 1,
    data: _fakeData,
  },
  {
    id: "1",
    title: "user2@gmail.com",
    start: new Date(2025, 3, 1, 9, 30, 0),
    end: new Date(2025, 3, 1, 16, 30, 0),
    resourceId: 2,
    data: _fakeData,
  },
  {
    id: "2",
    title: "user3@gmail.com",
    start: new Date(2025, 3, 1, 14, 0, 0),
    end: new Date(2025, 3, 1, 16, 30, 0),
    resourceId: 11,
    data: _fakeData,
  },
  {
    id: "3",
    title: "user4@gmail.com",
    start: new Date(2025, 3, 1, 8, 30, 0),
    end: new Date(2025, 3, 1, 12, 30, 0),
    resourceId: 3,
    data: _fakeData,
  },
  {
    id: "4",
    title: "user5@gmail.com",
    start: new Date(2025, 3, 2, 7, 0, 0),
    end: new Date(2025, 3, 2, 10, 30, 0),
    resourceId: 4,
    data: _fakeData,
  },
  {
    id: "5",
    title: "user6@gmail.com",
    start: new Date(2025, 3, 2, 7, 0, 0),
    end: new Date(2025, 3, 2, 10, 30, 0),
    resourceId: 4,
    data: _fakeData,
  },
];

const localizer = momentLocalizer(moment);

export const AppointmentCalender = () => {
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<MyEventType | null>(null);

  const onNavigate = useCallback(
    (newDate: Date) => {
      return setDate(newDate);
    },
    [setDate],
  );

  const onEventClick = (event: MyEventType) => {
    setSelectedEvent(event);
    setShowDialog(true);
  };

  const CustomToolbar:
    | ComponentType<ToolbarProps<MyEventType, object>>
    | undefined = ({ label, onNavigate }) => {
    return (
      <div className="flex items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-4">
          {view === "day" && (
            <Button variant="outline" onClick={() => setView("month")}>
              {"<"} Back to month view
            </Button>
          )}
          <span className="text-xl font-bold text-app">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onNavigate("PREV")}
          >
            <ChevronsLeft />
          </Button>
          <Button onClick={() => onNavigate("TODAY")}>Today</Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onNavigate("NEXT")}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    );
  };

  const CustomEvent = ({ event }: { event: MyEventType }) => {
    if (view === "day") {
      return (
        <div className="flex flex-col gap-1">
          <span>{event.title}</span>
          <div className="text-sm text-light-gray">
            {">"} Loan Amount - {event.data.loanAmount}
          </div>
          <div className="text-sm text-light-gray">
            {">"} Tenure Months - {event.data.tenureMonths}
          </div>
        </div>
      );
    }
    return <span>{event.title}</span>;
  };

  return (
    <>
      <Calendar<MyEventType>
        date={date}
        onNavigate={onNavigate}
        localizer={localizer}
        events={events}
        view={view}
        selectable={false}
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent,
        }}
        onSelectEvent={onEventClick}
        // onKeyPressEvent={(event) => console.log("Event Clicked:", event)}
        onView={() => setView(Views.DAY)}
        defaultView={Views.MONTH}
        showMultiDayTimes={false}
        style={{ height: "70vh" }}
        onShowMore={() => {
          setView(Views.DAY);
        }}
      />
      <OfferDetailDialog
        isOpen={showDialog}
        onOpenChange={setShowDialog}
        offerData={selectedEvent?.data || _fakeData}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        loanData={sampleData as any}
      />
    </>
  );
};
