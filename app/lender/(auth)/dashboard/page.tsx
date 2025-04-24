"use client";

import { Button } from "@/app/components/lib/button";
import { Calendar } from "@/app/components/lib/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/app/components/lib/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/lib/chart";
import { DateRangePicker } from "@/app/components/lib/date-range-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/lib/popover";
import { formatDate } from "@/helper/dateFormatter";
import { cn } from "@/lib/utils";
import { addDays, format, subDays } from "date-fns";
import {
  BanknoteArrowDown,
  CalendarIcon,
  CaptionsOff,
  CheckCheck,
  Send,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

const SummaryData = [
  {
    id: 1,
    title: "Loan Offer Sent",
    content: "10",
    desc: "Total number of loan offers sent",
    icon: <Send className="text-app" />,
  },
  {
    id: 2,
    title: "Loan Offers Accepted",
    content: "30",
    desc: "Total number of loan offers accepted",
    icon: <CheckCheck className="text-app" />,
  },
  {
    id: 3,
    title: "Loan Offers Rejected",
    content: "5",
    desc: "Total number of loan offers rejected",
    icon: <CaptionsOff className="text-app" />,
  },
  {
    id: 4,
    title: "Loan Offers Disbursed",
    content: "7",
    desc: "Total number of loan offers disbursed",
    icon: <BanknoteArrowDown className="text-app" />,
  },
];

const Dashboard = () => {
  const [selectedSummary, setSelectedSummary] = React.useState<number>(1);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="lender-page-title">Dashboard</h1>
        <div>
          <DateRangePicker date={date} onDateChange={setDate} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-1 md:grid-cols-2 lg:grid-cols-4">
        {SummaryData.map((data, index) => (
          <SummaryCard
            key={index}
            data={data}
            isSelected={selectedSummary === data.id}
            onClick={() => setSelectedSummary(data.id)}
          />
        ))}
      </div>
      <DashboardChart title={SummaryData[selectedSummary - 1].title} />
    </div>
  );
};

const SummaryCard = ({
  data,
  isSelected,
  onClick,
}: {
  data: {
    title: string;
    content: string;
    desc: string;
    icon: React.ReactNode;
  };
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <Card
      className={cn(
        "flex w-auto cursor-pointer items-start justify-between p-6",
        isSelected && "bg-app/15",
        isSelected && "border border-app",
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-2">
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

const DashboardChart = ({ title }: { title: string }) => {
  const chartData = useMemo(() => {
    return [
      {
        date: subDays(new Date(), 28),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 27),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 26),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 25),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 24),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 23),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 22),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 21),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 20),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 19),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 18),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 17),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 16),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 15),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 14),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 13),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 12),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 11),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 10),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 9),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 8),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 7),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 6),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 5),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 4),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 3),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 2),
        [title]: Math.floor(Math.random() * 1000),
      },
      {
        date: subDays(new Date(), 1),
        [title]: Math.floor(Math.random() * 1000),
      },
    ];
  }, [title]);

  const chartConfig = {
    data: {
      label: "date",
      color: "hsl(270, 90%, 73%)",
    },
    "Loan Offer Sent": {
      label: "Loan Offer Sent",
      color: "hsl(270, 90%, 73%)",
    },
    "Loan Offer Accepted": {
      label: "Loan Offer Accepted",
      color: "hsl(270, 90%, 73%)",
    },
    "Loan Offer Rejected": {
      label: "Loan Offer Rejected",
      color: "hsl(270, 90%, 73%)",
    },
    "Loan Offer Disbursed": {
      label: "Loan Offer Disbursed",
      color: "hsl(270, 90%, 73%)",
    },
  } satisfies ChartConfig;

  console.log({ chartConfig, title, chartData });

  return (
    <div>
      <h1 className="lender-page-title">Overview</h1>
      <ChartContainer
        config={chartConfig}
        className="max-h-[50vh] min-h-[200px] w-full"
      >
        <BarChart accessibilityLayer data={chartData}>
          <YAxis axisLine={false} tickLine={false} tickMargin={10} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => formatDate(value, false)}
          />
          <Bar
            dataKey={title}
            fill="var(--color-data)"
            radius={4}
            width={1000}
          />
          <Tooltip cursor={false} />
          {/* <ChartTooltip
            cursor={{ fill: "#f00" }}
            label={false}
            content={<ChartTooltipContent labelKey={title} />}
          /> */}
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default Dashboard;
