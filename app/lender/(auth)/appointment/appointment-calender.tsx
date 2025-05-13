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
import { ComponentType, useCallback, useMemo, useState } from "react";
import { Button } from "@/app/components/lib/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { OfferData } from "@/schemas/offer.schema";
import { useAuth } from "@/context/auth.context";
import LoanOfferDetailsDialog from "@/app/components/data-display/loan-offer-details-dialog";
import { useLenderOfferAppointmentQuery } from "@/queries/use-lender-offer-appointment-query";
import { LoaderWrapper } from "@/app/components/common/LoaderWrapper";
import { currencyFormatter } from "@/helper/numberFormatter";
interface MyEventType {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resourceId: number;
  data: OfferData;
}

const localizer = momentLocalizer(moment);

export const AppointmentCalender = () => {
  const { user } = useAuth();

  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<MyEventType | null>(null);

  const { data, isLoading } = useLenderOfferAppointmentQuery(user?.uid || "", {
    date: {
      from: new Date(date.getFullYear(), date.getMonth(), 1),
      to: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    },
  });

  const events = useMemo(() => {
    const filteredData = data?.filter(
      (item) => !!item.appointmentDetails,
    ) as Array<
      OfferData & {
        appointmentDetails: NonNullable<OfferData["appointmentDetails"]>;
      }
    >;
    return filteredData?.map((item, index) => ({
      id: `${item.id}-${index}`,
      title: item.email,
      start: new Date(item.appointmentDetails.appointmentDateTime),
      end: new Date(
        new Date(item.appointmentDetails.appointmentDateTime).setHours(
          new Date(item.appointmentDetails.appointmentDateTime).getHours() + 3,
        ),
      ),
      resourceId: index,
      data: item,
    }));
  }, [data]);

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
        <div className="flex flex-col gap-2">
          <span className="mt-3">{event.title}</span>
          <div className="text-sm text-light-gray">
            {"•"} Loan Amount - {currencyFormatter(event.data.loanAmount)}
          </div>
          <div className="text-sm text-light-gray">
            {"•"} Tenure Months - {event.data.tenureMonths} months
          </div>
        </div>
      );
    }
    return <span>{event.title}</span>;
  };

  return (
    <LoaderWrapper isLoading={isLoading}>
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
        onView={() => setView(Views.DAY)}
        defaultView={Views.MONTH}
        showMultiDayTimes={false}
        style={{ height: "70vh" }}
        onShowMore={() => {
          setView(Views.DAY);
        }}
      />

      <LoanOfferDetailsDialog
        isOpen={showDialog}
        onOpenChange={setShowDialog}
        offerData={selectedEvent?.data}
      />
    </LoaderWrapper>
  );
};
