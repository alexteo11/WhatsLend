import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "../constants";
import { OFFER_STATUS_ENUM } from "@/constants/commonEnums";
import { LenderDashboardDetails } from "@/schemas/dashboard.schema";

export const useAdminDashboardDetailsQuery = (params: {
  startDate?: string;
  endDate?: string;
  status?: OFFER_STATUS_ENUM;
}) => {
  return useQuery({
    queryKey: [
      QUERY_KEY.AdminDashboardDetails,
      params?.startDate,
      params?.endDate,
      params?.status,
    ],
    queryFn: async () => {
      try {
        const res = await authAxios.get<{
          data: LenderDashboardDetails;
        }>(`/report/all/offer/daily`, {
          params,
        });
        return res.data.data;
      } catch (err) {
        toast.error(getErrorMessage(err));
        throw new Error("Something went wrong.");
      }
    },
    enabled: () => {
      return !!params?.startDate && !!params?.endDate && !!params?.status;
    },
    placeholderData: keepPreviousData,
  });
};
