import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "./constants";
import { LenderDashboardSummary } from "@/schemas/dashboard.schema";

export const useLenderDashboardSummaryQuery = (
  params: {
    start_date?: string;
    end_date?: string;
  },
  lenderId?: string,
) => {
  return useQuery({
    queryKey: [
      QUERY_KEY.LenderDashboardSummary,
      lenderId,
      params?.start_date,
      params?.end_date,
    ],
    queryFn: async () => {
      try {
        const res = await authAxios.get<{
          data: LenderDashboardSummary;
        }>(`/report/${lenderId}/offer/summary`, {
          params,
        });
        return res.data.data;
      } catch (err) {
        toast.error(getErrorMessage(err));
        throw new Error("Something went wrong mtfk");
      }
    },
    enabled: () => {
      return !!lenderId && !!params?.start_date && !!params?.end_date;
    },
    placeholderData: keepPreviousData,
  });
};
