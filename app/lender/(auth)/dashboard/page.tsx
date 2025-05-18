"use client";

import { LoaderWrapper } from "@/app/components/common/LoaderWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/app/components/lib/card";
import { ChartConfig, ChartContainer } from "@/app/components/lib/chart";
import {
  DateRangePicker,
  DateRangeType,
} from "@/app/components/lib/date-range-picker";
import {
  LENDER_DASHBOARD_SUMMARY_TYPE_ENUM,
  OFFER_STATUS_ENUM,
} from "@/constants/commonEnums";
import { useAuth } from "@/context/auth.context";
import { formatDate } from "@/helper/dateFormatter";
import { cn } from "@/lib/utils";
import { useLenderDashboardDetailsQuery } from "@/queries/use-lender-dashboard-details-query";
import { useLenderDashboardSummaryQuery } from "@/queries/use-lender-dashboard-summary-query";
import { LenderDashboardDetails } from "@/schemas/dashboard.schema";
import { subDays } from "date-fns";
import {
  BanknoteArrowDown,
  CaptionsOff,
  CheckCheck,
  Loader2,
  Send,
} from "lucide-react";
import React, { useMemo } from "react";
import { DateRange } from "react-day-picker";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SummaryDataList = [
  {
    id: LENDER_DASHBOARD_SUMMARY_TYPE_ENUM.OFFER_SENT,
    title: "Loan Offer Sent",
    content: "0",
    desc: "Total number of loan offers sent",
    icon: <Send className="text-app" />,
    status: OFFER_STATUS_ENUM.ISSUED,
  },
  {
    id: LENDER_DASHBOARD_SUMMARY_TYPE_ENUM.OFFER_ACCEPTED,
    title: "Loan Offers Accepted",
    content: "0",
    desc: "Total number of loan offers accepted",
    icon: <CheckCheck className="text-app" />,
    status: OFFER_STATUS_ENUM.ACCEPTED,
  },
  {
    id: LENDER_DASHBOARD_SUMMARY_TYPE_ENUM.OFFER_REJECTED,
    title: "Loan Offers Rejected",
    content: "0",
    desc: "Total number of loan offers rejected",
    icon: <CaptionsOff className="text-app" />,
    status: OFFER_STATUS_ENUM.REJECTED,
  },
  {
    id: LENDER_DASHBOARD_SUMMARY_TYPE_ENUM.OFFER_DISBURSED,
    title: "Loan Offers Disbursed",
    content: "0",
    desc: "Total number of loan offers disbursed",
    icon: <BanknoteArrowDown className="text-app" />,
    status: OFFER_STATUS_ENUM.COMPLETED,
  },
];

const Dashboard = () => {
  const [selectedSummary, setSelectedSummary] = React.useState(
    SummaryDataList[0],
  );
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(new Date().setHours(0, 0, 0, 0)), 29),
    to: new Date(new Date().setHours(23, 59, 59, 999)),
  });

  const { user } = useAuth();

  const { data: summaryData, isLoading: isLoadingSummary } =
    useLenderDashboardSummaryQuery(
      {
        start_date: date?.from?.toISOString(),
        end_date: date?.to?.toISOString(),
      },
      user?.uid,
    );
  const { data: detailsData, isLoading: isLoadingDetails } =
    useLenderDashboardDetailsQuery(
      {
        start_date: date?.from?.toISOString(),
        end_date: date?.to?.toISOString(),
        status: selectedSummary.status,
      },
      user?.uid,
    );

  const _summaryData = useMemo(() => {
    if (!summaryData) {
      return SummaryDataList;
    }

    Object.entries(summaryData).forEach(([key, value]) => {
      const data = SummaryDataList.find((item) => item.id === key);
      if (data) {
        data.content = String(value);
      }
    });

    return SummaryDataList;
  }, [summaryData]);

  return (
    <LoaderWrapper isLoading={isLoadingSummary}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="lender-page-title">Dashboard</h1>
          <div>
            <DateRangePicker
              date={date}
              onDateChange={setDate}
              selectedDateRangeType={DateRangeType.LAST_30_DAYS}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-1 md:grid-cols-2 lg:grid-cols-4">
          {_summaryData.map((data, index) => (
            <SummaryCard
              key={index}
              data={data}
              isSelected={selectedSummary.id === data.id}
              onClick={() => {
                const selected = _summaryData.find(
                  (item) => item.id === data.id,
                );
                setSelectedSummary(selected || _summaryData[0]);
              }}
            />
          ))}
        </div>
        <DashboardChart
          title={selectedSummary.title}
          data={detailsData || {}}
          isLoading={isLoadingDetails}
        />
      </div>
    </LoaderWrapper>
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

const DashboardChart = ({
  title,
  data,
  isLoading,
}: {
  title: string;
  data: LenderDashboardDetails;
  isLoading: boolean;
}) => {
  const chartData = useMemo(() => {
    return Object.entries(data).map(([key, item]) => ({
      date: new Date(key),
      [title]: item,
    }));
  }, [data]);

  const chartConfig = {
    data: {
      label: "date",
      color: "hsl(270, 90%, 73%)",
    },
    [title]: {
      label: title,
      color: "hsl(270, 90%, 73%)",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <h1 className="lender-page-title mb-5">Overview</h1>
      {isLoading ? (
        <div className="flex h-[300px] items-center justify-center">
          <Loader2 className="size-10 animate-spin items-center text-app" />
        </div>
      ) : (
        <ChartContainer
          config={chartConfig}
          className="max-h-[50vh] min-h-[200px] w-full"
        >
          <LineChart accessibilityLayer data={chartData}>
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              allowDecimals={false}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => formatDate(value, false)}
            />
            <Line
              dataKey={title}
              stroke="var(--color-data)"
              strokeWidth={2}
              dot={false}
            />
            <Tooltip cursor={false} />
            {/* <ChartTooltip
            cursor={{ fill: "#f00" }}
            label={false}
            content={<ChartTooltipContent labelKey={title} />}
          /> */}
          </LineChart>
        </ChartContainer>
      )}
    </div>
  );
};

export default Dashboard;
