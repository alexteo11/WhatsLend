"use client";

import { Button } from "@/app/components/lib/button";
import { Calendar } from "@/app/components/lib/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/app/components/lib/card";
import { ChartConfig, ChartContainer } from "@/app/components/lib/chart";
import { DateTimePicker } from "@/app/components/lib/datetime-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/lib/popover";
import { cn } from "@/lib/utils";
import { addDays, format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { Bar, BarChart } from "recharts";

const SummaryData = [
  {
    title: "Loan Offers Sent",
    content: "0",
    desc: "Total number of loan offers sent",
    icon: <i className="ri-send-plane-line text-4xl"></i>,
  },
  {
    title: "Loan Offers Accepted",
    content: "0",
    desc: "Total number of loan offers accepted",
    icon: <i className="ri-send-plane-line text-4xl"></i>,
  },
  {
    title: "Loan Offers Rejected",
    content: "0",
    desc: "Total number of loan offers rejected",
    icon: <i className="ri-send-plane-line text-4xl"></i>,
  },
  {
    title: "Loan Offers Disbursed",
    content: "0",
    desc: "Total number of loan offers disbursed",
    icon: <i className="ri-send-plane-line text-4xl"></i>,
  },
];

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="h-[150vh]">
      <div className="flex items-center justify-between">
        <h1 className="lender-page-title">Dashboard</h1>
        <div>
          <DateTimeRangePicker />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-1 md:grid-cols-2 lg:grid-cols-4">
        {SummaryData.map((data, index) => (
          <SummaryCard key={index} data={data} />
        ))}
      </div>
      <DashboardChart />
    </div>
  );
};

const SummaryCard = ({
  data,
}: {
  data: { title: string; content: string; desc: string; icon: React.ReactNode };
}) => {
  return (
    <Card className="flex w-auto items-center justify-between p-4">
      <div>
        <CardTitle className="font-semibold">{data.title}</CardTitle>
        <CardContent className="p-1 text-2xl font-bold">
          {data.content}
        </CardContent>
        <CardDescription className="text-sm text-light-gray">
          {data.desc}
        </CardDescription>
      </div>
      {data.icon}
    </Card>
  );
};

const DateTimeRangePicker = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
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
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

const DashboardChart = () => {
  const chartData = [
    { date: subDays(new Date(), 14), desktop: 250 },
    { date: subDays(new Date(), 13), desktop: 180 },
    { date: subDays(new Date(), 12), desktop: 270 },
    { date: subDays(new Date(), 11), desktop: 240 },
    { date: subDays(new Date(), 10), desktop: 100 },
    { date: subDays(new Date(), 9), desktop: 150 },
    { date: subDays(new Date(), 8), desktop: 200 },
    { date: subDays(new Date(), 7), desktop: 220 },
    { date: subDays(new Date(), 6), desktop: 186 },
    { date: subDays(new Date(), 5), desktop: 305 },
    { date: subDays(new Date(), 4), desktop: 237 },
    { date: subDays(new Date(), 3), desktop: 73 },
    { date: subDays(new Date(), 2), desktop: 209 },
    { date: subDays(new Date(), 1), desktop: 214 },
    { date: subDays(new Date(), 14), desktop: 250 },
    { date: subDays(new Date(), 13), desktop: 180 },
    { date: subDays(new Date(), 12), desktop: 270 },
    { date: subDays(new Date(), 11), desktop: 240 },
    { date: subDays(new Date(), 10), desktop: 100 },
    { date: subDays(new Date(), 9), desktop: 150 },
    { date: subDays(new Date(), 8), desktop: 200 },
    { date: subDays(new Date(), 7), desktop: 220 },
    { date: subDays(new Date(), 6), desktop: 186 },
    { date: subDays(new Date(), 5), desktop: 305 },
    { date: subDays(new Date(), 4), desktop: 237 },
    { date: subDays(new Date(), 3), desktop: 73 },
    { date: subDays(new Date(), 2), desktop: 209 },
    { date: subDays(new Date(), 1), desktop: 214 },
    { date: subDays(new Date(), 14), desktop: 250 },
    { date: subDays(new Date(), 13), desktop: 180 },
    { date: subDays(new Date(), 12), desktop: 270 },
    { date: subDays(new Date(), 11), desktop: 240 },
    { date: subDays(new Date(), 10), desktop: 100 },
    { date: subDays(new Date(), 9), desktop: 150 },
    { date: subDays(new Date(), 8), desktop: 200 },
    { date: subDays(new Date(), 7), desktop: 220 },
    { date: subDays(new Date(), 6), desktop: 186 },
    { date: subDays(new Date(), 5), desktop: 305 },
    { date: subDays(new Date(), 4), desktop: 237 },
    { date: subDays(new Date(), 3), desktop: 73 },
    { date: subDays(new Date(), 2), desktop: 209 },
    { date: subDays(new Date(), 1), desktop: 214 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <h1 className="lender-page-title">Overview</h1>
      <ChartContainer
        config={chartConfig}
        className="max-h-[50vh] min-h-[200px] w-full"
      >
        <BarChart accessibilityLayer data={chartData}>
          <Bar
            dataKey="desktop"
            fill="var(--color-desktop)"
            radius={4}
            width={1000}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default Dashboard;
