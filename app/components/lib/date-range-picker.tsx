"use client";

import { subDays, format } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";

interface DateRangePicker extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

enum DateRangeType {
  CUSTOM_RANGE = "1",
  TODAY = "2",
  YESTERDAY = "3",
  LAST_7_DAYS = "4",
  LAST_30_DAYS = "5",
  THIS_MONTH = "6",
  LAST_MONTH = "7",
}

const dateRangeTypeOptions = [
  { value: DateRangeType.CUSTOM_RANGE, label: "Custom Range" },
  { value: DateRangeType.TODAY, label: "Today" },
  { value: DateRangeType.YESTERDAY, label: "Yesterday" },
  { value: DateRangeType.LAST_7_DAYS, label: "Last 7 days" },
  { value: DateRangeType.LAST_30_DAYS, label: "Last 30 days" },
  { value: DateRangeType.THIS_MONTH, label: "This month" },
  { value: DateRangeType.LAST_MONTH, label: "Last month" },
];

export const DateRangePicker = ({ date, onDateChange }: DateRangePicker) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [tempDate, setTempDate] = useState<DateRange | undefined>(date);
  const [prevDateRangeType, setPrevDateRangeType] = useState<DateRangeType>(
    DateRangeType.CUSTOM_RANGE,
  );
  const [selectedDateRangeType, setSelectedDateRangeType] =
    useState<DateRangeType>(prevDateRangeType);

  const onDateRangeTypeChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    const type = (event.currentTarget as HTMLInputElement)
      .name as DateRangeType;
    setSelectedDateRangeType(type);

    const date = {
      from: new Date(new Date().setHours(0, 0, 0, 0)),
      to: new Date(new Date().setHours(23, 59, 59, 999)),
    };

    switch (type) {
      case DateRangeType.CUSTOM_RANGE:
        return;
      case DateRangeType.TODAY:
        break;
      case DateRangeType.YESTERDAY:
        date.from = subDays(date.from, 1);
        break;
      case DateRangeType.LAST_7_DAYS:
        date.from = subDays(date.from, 6);
        break;
      case DateRangeType.LAST_30_DAYS:
        date.from = subDays(date.from, 29);
        break;
      case DateRangeType.THIS_MONTH:
        date.from = new Date(
          new Date(date.from.getFullYear(), date.from.getMonth(), 1).setHours(
            0,
            0,
            0,
            0,
          ),
        );
        break;
      case DateRangeType.LAST_MONTH:
        date.from = new Date(
          new Date(
            date.from.getFullYear(),
            date.from.getMonth() - 1,
            1,
          ).setHours(0, 0, 0, 0),
        );
        date.to = new Date(
          new Date(
            date.from.getFullYear(),
            date.from.getMonth() + 1,
            0,
          ).setHours(0, 0, 0, 0),
        );
        break;
      default:
        break;
    }

    setTempDate(date);
  };

  const onConfirmBtnClick = () => {
    onDateChange(tempDate);
    setPrevDateRangeType(selectedDateRangeType);
    setIsPopoverOpen(false);
  };

  const resetToPreviousDate = () => {
    setTempDate(date);
    setSelectedDateRangeType(prevDateRangeType);
    setIsPopoverOpen(false);
  };

  return (
    <div className={cn("")}>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex h-full">
            <div className="flex flex-col gap-1 border-r-[0.5px] border-r-light-gray/20 p-2 [&>button]:justify-start">
              {dateRangeTypeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant="ghost"
                  name={option.value}
                  onClick={(e) => onDateRangeTypeChange(e)}
                  className={
                    selectedDateRangeType === option.value ? "bg-accent" : ""
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
            <div className="mx-4 flex flex-col py-2">
              <Calendar
                mode="range"
                defaultMonth={tempDate?.from}
                selected={tempDate}
                onSelect={(date) => {
                  setSelectedDateRangeType(DateRangeType.CUSTOM_RANGE);
                  setTempDate(date);
                }}
                numberOfMonths={2}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
              <div className="flex items-center justify-end gap-2">
                <span className="flex-1 text-sm text-light-gray">
                  {tempDate?.from ? (
                    tempDate.to ? (
                      <>
                        {format(tempDate.from, "LLL dd, y")} -{" "}
                        {format(tempDate.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(tempDate.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </span>
                <Button variant="outline" onClick={resetToPreviousDate}>
                  Cancel
                </Button>
                <Button onClick={onConfirmBtnClick}>Confirm</Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
