import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "../constants";
import { LenderDashboardSummary } from "@/schemas/dashboard.schema";

export const useAdminDashboardSummaryQuery = (params: {
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery({
    queryKey: [
      QUERY_KEY.AdminDashboardSummary,
      params?.startDate,
      params?.endDate,
    ],
    queryFn: async () => {
      try {
        const res = await authAxios.get<{
          data: LenderDashboardSummary;
        }>(`/report/all/offer/summary`, {
          params,
        });
        return res.data.data;
      } catch (err) {
        toast.error(getErrorMessage(err));
        throw new Error("Something went wrong.");
      }
    },
    enabled: () => {
      return !!params?.startDate && !!params?.endDate;
    },
    placeholderData: keepPreviousData,
  });
};
